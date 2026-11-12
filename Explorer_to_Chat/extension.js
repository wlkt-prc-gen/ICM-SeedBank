const vscode = require('vscode');
const path = require('path');

// Explorer passes (clickedUri, allSelectedUris); editor menus pass only the uri.
function targetUris(uri, uris) {
  if (Array.isArray(uris) && uris.length > 0) return uris;
  if (uri instanceof vscode.Uri) return [uri];
  const active = vscode.window.activeTextEditor;
  return active ? [active.document.uri] : [];
}

function relativePath(uri) {
  return vscode.workspace.asRelativePath(uri, false).replace(/\\/g, '/');
}

function markdownLink(uri) {
  const rel = relativePath(uri);
  const name = path.basename(uri.fsPath);
  const href = rel.split('/').map(encodeURIComponent).join('/');
  return `[${name}](${href})`;
}

function register(context, command, format, label) {
  context.subscriptions.push(
    vscode.commands.registerCommand(command, async (uri, uris) => {
      const targets = targetUris(uri, uris);
      if (targets.length === 0) {
        vscode.window.showWarningMessage('No file or folder selected.');
        return;
      }
      const text = targets.map(format).join('\n');
      await vscode.env.clipboard.writeText(text);
      const summary = targets.length === 1 ? text : `${targets.length} paths`;
      vscode.window.setStatusBarMessage(`$(clippy) Copied ${label}: ${summary}`, 3000);
    })
  );
}

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Known chat assistants. `tabs` matches their editor-tab webviews; `sidebar` lists
// the generic `<viewId>.focus` commands VS Code creates for their side-bar views.
const CHATS = [
  {
    id: 'claude',
    label: 'Claude Code',
    extension: 'anthropic.claude-code',
    tabs: /claudeVSCodePanel/,
    sidebar: ['claudeVSCodeSidebarSecondary.focus', 'claudeVSCodeSidebar.focus'],
  },
  {
    id: 'codex',
    label: 'Codex',
    extension: 'openai.chatgpt',
    tabs: /chatgpt\.(panelView|conversationEditor)/,
    sidebar: ['chatgpt.sidebarSecondaryView.focus', 'chatgpt.sidebarView.focus'],
  },
  {
    id: 'continue',
    label: 'Continue',
    extension: 'continue.continue',
    tabs: /continue\./,
    sidebar: ['continue.continueGUIView.focus'],
  },
];

const LAST_CHAT_KEY = 'prcCopyPath.lastChat';
const GROUP_FOCUS = ['First', 'Second', 'Third', 'Fourth', 'Fifth', 'Sixth', 'Seventh', 'Eighth']
  .map((n) => `workbench.action.focus${n}EditorGroup`);

const installedChats = () => CHATS.filter((chat) => vscode.extensions.getExtension(chat.extension));

// Chat panels currently showing as the active tab of an editor group.
function visibleChatTabs() {
  const found = [];
  vscode.window.tabGroups.all.forEach((group, groupIndex) => {
    const tab = group.activeTab;
    const viewType = tab && tab.input instanceof vscode.TabInputWebview ? tab.input.viewType : '';
    const chat = viewType && CHATS.find((c) => c.tabs.test(viewType));
    if (chat) found.push({ chat, group, groupIndex, tabIndex: group.tabs.indexOf(tab) });
  });
  return found;
}

// Ask which chat receives the path, listing the last one used first so Enter repeats it.
async function pickChat(context) {
  const lastId = context.globalState.get(LAST_CHAT_KEY);
  const chats = installedChats().sort((a, b) => (b.id === lastId) - (a.id === lastId));
  const choice = await vscode.window.showQuickPick(
    chats.map((chat) => ({ label: chat.label, chat })),
    { placeHolder: 'Which chat should receive the path?' }
  );
  if (!choice) return undefined;
  await context.globalState.update(LAST_CHAT_KEY, choice.chat.id);
  // If the chosen chat is open as an editor tab, target that tab rather than its side bar.
  const tab = visibleChatTabs().find((t) => t.chat.id === choice.chat.id);
  return tab || { chat: choice.chat };
}

async function focusChat(target) {
  if (target.group) {
    const focusGroup = GROUP_FOCUS[target.groupIndex];
    if (focusGroup) await vscode.commands.executeCommand(focusGroup);
    await vscode.commands.executeCommand('workbench.action.openEditorAtIndex', target.tabIndex);
    return true;
  }
  for (const command of target.chat.sidebar) {
    try {
      await vscode.commands.executeCommand(command);
      return true;
    } catch {
      // view not registered in this layout; try the next one
    }
  }
  return false;
}

// Focus the chosen chat and paste the plain relative path(s) into its prompt.
// The paths stay on the clipboard so Ctrl+V works if the automatic paste is blocked.
async function addToChat(context, uri, uris) {
  const targets = targetUris(uri, uris);
  if (targets.length === 0) {
    vscode.window.showWarningMessage('No file or folder selected.');
    return;
  }
  await vscode.env.clipboard.writeText(targets.map(relativePath).join(' ') + ' ');

  const target = await pickChat(context);
  if (!target || !(await focusChat(target))) {
    vscode.window.showInformationMessage('Path copied. Click in the chat prompt and press Ctrl+V.');
    return;
  }
  await sleep(300);
  await vscode.commands.executeCommand('editor.action.clipboardPasteAction');
  vscode.window.setStatusBarMessage(`$(comment) Path sent to ${target.chat.label} (Ctrl+V if it did not appear)`, 4000);
}

function activate(context) {
  register(context, 'prcCopyPath.relative', relativePath, 'relative path');
  register(context, 'prcCopyPath.markdownLink', markdownLink, 'Markdown link');
  context.subscriptions.push(
    vscode.commands.registerCommand('prcCopyPath.addToChatPick', (uri, uris) => addToChat(context, uri, uris))
  );
}

function deactivate() {}

module.exports = { activate, deactivate };
