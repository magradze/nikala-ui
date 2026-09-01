# Security Policy

Nikala UI takes the security of our component ecosystem, CLI tooling, reactive primitives, and MCP server seriously. We appreciate the responsible disclosure of any vulnerabilities discovered by security researchers and community developers.

---

## 1. Supported Versions

We actively maintain and provide security patches for the following versions:

| Package / Workspace | Supported Versions | Security Status |
| :--- | :--- | :--- |
| `@nikala-ui/cli` | `>= 0.11.0` | :white_check_mark: Supported |
| `@nikala-ui/core` | `>= 0.11.0` | :white_check_mark: Supported |
| `@nikala-ui/hooks` | `>= 0.11.0` | :white_check_mark: Supported |
| `@nikala-ui/mcp` | `>= 0.11.0` | :white_check_mark: Supported |
| `apps/web` (`nikala.dev`) | `main` | :white_check_mark: Supported |
| `< 0.11.0` | All | :x: End of Life (Upgrade recommended) |

> [!IMPORTANT]
> **Note on Copy-Paste Code Ownership:**
> Nikala UI implements a 100% pure copy-paste ownership model. Upstream security patches published for `@nikala-ui/core` and `@nikala-ui/hooks` immediately safeguard new installations. If you have already copied components or hooks into your local repository (`src/components/ui/` or `src/hooks/`), run:
>
> ```bash
> bunx @nikala-ui/cli diff
> # or to update installed components/hooks:
> bunx @nikala-ui/cli add <component-or-hook-name> --overwrite
> ```
>
> to review and pull the patched upstream source code into your project.

---

## 2. Reporting a Vulnerability

If you believe you have discovered a security vulnerability in Nikala UI, please **DO NOT** open a public issue or discussion on GitHub.

### How to Report Privately

1. **GitHub Private Vulnerability Reporting (Recommended):**
   - Open a private advisory report directly at [Nikala UI Security Advisories](https://github.com/nikala-ui/ui/security/advisories/new).

2. **Direct Security Email:**
   - Alternatively, email the maintainer directly at **`magradze.dev@gmail.com`** (or via [github.com/magradze](https://github.com/magradze)).

### What to Include in Your Report

To help us triage and resolve the issue quickly, please provide:

- **Affected Workspace/Package**: (`@nikala-ui/cli`, `@nikala-ui/core`, `@nikala-ui/hooks`, `@nikala-ui/mcp`, or `apps/web`).
- **Description**: Clear description of the vulnerability and its potential impact.
- **Proof of Concept (PoC)**: Minimal reproduction code, steps to reproduce, or sample exploit payload.
- **Suggested Fix**: Any recommended patches or remediations (if known).

---

## 3. Response Process & SLA

When a vulnerability report is received:

1. **Acknowledgement**: We aim to acknowledge receipt of your report within **48 hours**.
2. **Investigation & Triage**: We will confirm the issue, evaluate severity according to CVSS standards, and keep you informed throughout the process.
3. **Patch & Release**: We will prepare a fix and release a patch version as quickly as possible across affected packages.
4. **Public Advisory & Credit**: Once the patch is published and users have had sufficient time to update, a public GitHub Security Advisory will be issued, giving full credit to the researcher (unless anonymity is requested).

---

## 4. Scope & Key Security Considerations

- **`@nikala-ui/cli`**: Secure path sanitization during component scaffolding, avoiding directory traversal or untrusted script execution.
- **`@nikala-ui/mcp`**: Workspace directory boundary enforcement, safe tool execution, and secure SSE endpoint streaming.
- **`@nikala-ui/core` & `@nikala-ui/hooks`**: Preventing Cross-Site Scripting (XSS), prototype pollution, unsafe DOM injections, and ensuring safe SSR hydration.

Thank you for helping keep the Nikala UI ecosystem safe and secure for everyone!
