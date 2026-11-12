# Explorer to Chat

Right-click a file or folder in VS Code's Explorer, choose **Add Path to Chat?**, and pick Claude Code, Codex, or Continue. The extension copies a forward-slash relative path and attempts to paste it into that assistant's prompt. It does not submit the message. Two other commands copy a plain path or a Markdown link.

Version: 1.0.0. Extension source version: 1.4.0. AI-assisted packaging of an existing local extension contributed by Pedro Ribeiro da Costa. This is a one-use setup seed, not a recurring skill. It establishes a small editor capability; it does not build a new knowledge workspace.

Use this with desktop VS Code and a workspace folder. ?Explorer? means VS Code's file tree, not Windows File Explorer. A path is text, not file contents, an attachment, or an @-mention. The receiving assistant needs its own access to the referenced workspace.

```text
Use this seed to set up Explorer to Chat in my existing VS Code workspace.
Read my workspace rules, inspect existing installations, and propose the exact
source location and installation steps before changing anything.
```

## Before writing

Save accessible editor buffers; read existing AGENTS.md, CLAUDE.md, and area instructions. Identify the workspace, its owner and named setup approver, the target VS Code installation/profile, operating system, Node.js/npm availability, and installed assistant extensions. Ask only for missing material details. Do not install or upgrade another assistant as a side effect.

Inventory existing extension sources and the installed extension ID `walkertrust.copy-relative-path-slash`. Preserve customized or newer versions. Check whether the `code` CLI points to the intended editor/profile. Remote, browser, multi-root, and alternative-editor setups need separate verification; the reference workflow assumes one local workspace root. In multi-root workspaces, paths may be ambiguous because the extension omits the root name.

Propose the smallest source folder in the workspace's existing tools or skills area, its files, any migration, packaging prerequisites, intended profile, and whether installation/reload is authorized. Name the approver and stop for setup approval unless that exact work is already authorized. A request to read this seed alone does not approve installing tools, downloading dependencies, or reloading VS Code. If installation is declined, leave reviewed sources and manual instructions only.

## Files and responsibilities

The following files are distributed beside this seed. Read them at the same reviewed GitHub commit; never reconstruct missing source from a description. If unavailable, report the gap and stop installation.

- [extension.js](extension.js): path formatting, chat picker, focus routing, clipboard fallback, and command registration.
- [package.json](package.json): extension identity, engine requirement, menu commands, and keyboard shortcuts.
- [install.ps1](install.ps1): Windows packaging and installation helper; downloads `@vscode/vsce` through npm and keeps the generated VSIX outside the source folder.
- [.vscodeignore](.vscodeignore): packaging exclusions for the installation helper and README.
- This README: setup instructions, everyday use, limitations, and recovery. Keep a local copy with the sources.

Illustrative tree; adapt the parent to existing workspace rules:

```text
<existing-tools-area>/Explorer_to_Chat/
  README.md
  extension.js
  package.json
  install.ps1
  .vscodeignore
```

There are no credentials or client files in this package. Copy only these reviewed sources. Do not upload the destination workspace or include its files in the extension package. Check that the folder contains no unrelated files before packaging.

## Set up the capability

1. After approval, copy the five files into the agreed folder. Compare existing files before writing; repeated application repairs only approved gaps. Preserve attribution and local changes. Do not overwrite a newer installed extension with this reference version without explicit agreement.
2. Check `node --check extension.js`, parse package.json, and confirm the installed editor meets its declared `engines.vscode` requirement. Confirm `node`, `npm`/`npx`, and `code` are available. The helper uses the current npm release of `@vscode/vsce`, so dependency availability may change; record the tool version actually used. No VSIX is distributed here.
3. With Windows installation authorized, run the following from the agreed source directory:

```powershell
powershell -NoProfile -ExecutionPolicy Bypass -File ./install.ps1
```

The helper uses `--force` to replace the same extension identity. Confirm the existing version/profile first. On another operating system, do not run the PowerShell helper by assumption: propose equivalent packaging and installation, use an agreed temporary output location, and record that this path needs its own verification.

4. A packaging or install failure means setup is incomplete. Preserve existing sources and the error; fix the specific prerequisite before retrying. Never claim installation just because packaging succeeded. Save buffers and coordinate **Developer: Reload Window** with the user because it interrupts editor sessions. Do not reload their active session automatically.
5. Record the source commit, extension version, target profile, installation result, checks actually performed, limitations, owner, and next action in the local README or an existing setup record. Keep private environment details out of public contributions.

## Everyday use

- Select one or several files/folders in the Explorer. Right-click **Add Path to Chat?**, then choose an installed assistant. The last choice appears first; Enter selects it again. With Explorer focused, `Ctrl+Alt+Shift+C` invokes the picker.
- A visible active editor tab for the chosen assistant is preferred; otherwise the extension tries its sidebar focus commands. Assistant extension IDs, view IDs, and focus behavior may change. A successful focus command does not prove the input field received the paste.
- If no assistant is available, the picker is cancelled, focusing fails, or the text does not appear, the copied path remains on the clipboard. Click the intended prompt and paste manually. Check the recipient and text before sending. Cancelling the picker still replaces the clipboard.
- Multiple paths are separated by spaces for chat; paths containing spaces are plain unquoted text. If ambiguous, copy one at a time or explain the boundaries in the prompt.
- **Copy Relative Path (/)** copies one forward-slash path per line. **Copy Relative Path as Markdown Link** copies filename-labelled links with URL-encoded targets. These appear on Explorer and editor menus. `Ctrl+Alt+Shift+R` copies the focused file's relative path.
- Only reference files you intend the chosen assistant to access. Clipboard contents are replaced by these commands. No message is submitted automatically.

## Validate and hand over

Use disposable, non-sensitive files in the authorized workspace. Explain each source file and invite the owner to perform one right-click action. Record observed results, not assumed success:

1. A file and a folder produce relative forward-slash paths; a name containing spaces produces an encoded Markdown target.
2. Multiple selections produce newline-separated clipboard paths and space-separated chat text. Verify the exact chosen recipient without submitting a message.
3. Test each installed assistant actually in scope, including an editor tab and sidebar if used. Do not claim all three were tested from one successful assistant.
4. Cancel the picker and test the manual clipboard fallback. With no supported assistant installed, copying still provides a usable manual path.
5. Repeat setup against existing files: preserve customizations and newer versions; record approved differences. Test packaging failure recovery without removing a working installation.

Automated source checks and mocked command tests cannot prove focus/paste behavior in a live editor. If an interactive check cannot run, state that limitation and leave it as the owner's next action. The reference source was used in its contributor's local workflow; this release does not claim a cross-platform or all-assistant live test.

To remove the extension, use VS Code's Extensions view for `walkertrust.copy-relative-path-slash`, or `code --uninstall-extension walkertrust.copy-relative-path-slash` against the correct profile. To roll back, reinstall the previously recorded trusted version; do not delete workspace sources or unrelated settings. If assistant integration changes, preserve the copy commands and use manual paste while reviewing the `CHATS` mapping.

## Completion checklist

- [ ] Destination, owner, profile, existing rules, and installation approval are recorded.
- [ ] Five reviewed files are present; existing sources and newer/customized installations are preserved.
- [ ] Syntax, manifest, packaging, and installation checks record actual outcomes.
- [ ] Reload is coordinated, and observed assistant/clipboard checks are distinguished from pending checks.
- [ ] Repeated setup, declined installation, missing source, failed packaging, and manual paste recovery have explicit handling.
- [ ] Owner can explain the files, change the destination or assistant choice, and name the next action.
- [ ] Source commit, version, limitations, uninstall/rollback route, and handover are recorded; no private workspace is published.
