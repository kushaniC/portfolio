
=== `redscan-cli.md` ===
```markdown
# RedScan CLI – Web Vulnerability Scanner

## Project Overview
RedScan CLI is a beginner-friendly, red-team style web vulnerability scanner built in Python. Designed to help security learners understand common web vulnerabilities through hands-on testing against intentionally vulnerable applications like OWASP Juice Shop.

## Problem Statement
Many web scanners are complex, GUI-heavy, or require extensive configuration. RedScan CLI provides a lightweight, terminal-based alternative that focuses on core vulnerability checks with clear, educational output—ideal for students and junior security practitioners.

## Key Features
- **HTTPS Detection**: Validates TLS/SSL configuration and certificate validity
- **Security Header Analysis**: Checks for missing or misconfigured headers (CSP, HSTS, X-Frame-Options, etc.)
- **Basic Port Scanning**: Identifies open HTTP/HTTPS ports on target hosts
- **Simple Vulnerability Checks**: 
  - Directory traversal probes
  - Default credential testing (configurable wordlists)
  - Information disclosure via error messages
- **CLI-Based Terminal Output**: Color-coded results with severity indicators
- **Structured Scan Reporting**: JSON and text output formats for integration or review
- **Modular Architecture**: Each check is a separate function for easy extension

## Technical Implementation
```python
# Example: Security header check function
def check_security_headers(url):
    headers_to_check = {
        'Strict-Transport-Security': 'Missing HSTS header',
        'X-Content-Type-Options': 'Missing X-Content-Type-Options',
        'X-Frame-Options': 'Missing X-Frame-Options',
        'Content-Security-Policy': 'Missing CSP header'
    }
    
    response = requests.get(url, timeout=10)
    findings = []
    
    for header, message in headers_to_check.items():
        if header not in response.headers:
            findings.append({'severity': 'medium', 'message': message})
    
    return findings

Repository
🔗 https://github.com/kushaniC/RedScan-CLI

Stack

Python (Requests, Socket, argparse)
OWASP Juice Shop for testing
Git for version control
Tested on Kali Linux 2024.x, Windows 11 (WSL2)