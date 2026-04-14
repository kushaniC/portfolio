
=== `soc-simulation-lab.md` ===
```markdown
# SOC Simulation Lab – SIEM Deployment & Threat Detection

## Project Overview
A complete Security Operations Center (SOC) simulation built in an isolated VMware environment. This project demonstrates end-to-end threat detection workflows: log ingestion, alert correlation, vulnerability assessment, and framework-aligned risk reporting using Wazuh SIEM.

## Problem Statement
Many cybersecurity learners struggle to connect offensive security tools with defensive operations. This lab bridges that gap by simulating real SOC workflows: detecting attacks, triaging alerts, mapping findings to industry frameworks, and producing actionable reports.

## Architecture
┌─────────────────────────────────────┐
│ Windows Host (VMware Workstation) │
│ ├─ VMnet8 (NAT): Internet access │
│ └─ VMnet1 (Host-Only): Lab isolation │
└────────────────────────────────────┘
▲
│ Host-Only (192.168.1.0/24)
┌────────────────────────────────────┐
│ Ubuntu SIEM (192.168.1.20) │
│ ├─ Wazuh Manager 4.7.5 │
│ ├─ OpenSearch Dashboard │
│ └─ Syslog receiver (UDP 5140) │
│ │
│ Kali Linux (192.168.1.30) │
│ ├─ Log generator (rsyslog forward)│
│ ├─ Testing tools (Nmap, Hydra) │
│ └─ Metasploit (check-only mode) │
└────────────────────────────────────┘


## Key Components
### 1. Log Ingestion Pipeline
- Configured Kali to forward all syslog to Ubuntu via UDP port 5140
- Wazuh `wazuh-remoted` parsed incoming logs, applied decoders, and triggered rules
- Alerts visible in Dashboard within <60 seconds of attack initiation

### 2. Attack Simulation & Detection
- Simulated SSH brute force using Hydra against Ubuntu
- Wazuh Rule ID 5710 triggered on `Failed password` frequency thresholds
- Auto-mapped to MITRE ATT&CK T1110.001 (Brute Force: Password Guessing)

### 3. Vulnerability Assessment
- Conducted Nmap scans of lab assets (`-sV -sC -p-`)
- Identified open ports, service versions, and potential misconfigurations
- Scored findings using CVSS v3.1 and mapped to NIST CSF 2.0 controls

### 4. Risk Reporting
- Produced executive summary (1-page, business-facing)
- Created technical report with IoC tracking, mitigation steps, and framework mapping
- All documentation structured for portfolio presentation and interview discussion

## Results & Validation
| Metric | Result |
|--------|--------|
| Time to Detect (Brute Force) | < 60 seconds |
| Alert Accuracy | 100% (no false positives in controlled test) |
| Framework Mapping | 100% of findings mapped to NIST CSF + MITRE ATT&CK |
| Report Completeness | Executive + Technical reports with actionable mitigations |

✅ Detection pipeline operated reliably across multiple test runs  
✅ Alerts included full context: source IP, timestamp, rule ID, MITRE mapping  
✅ Risk register enabled prioritization of mitigations by business impact

## Lessons Learned
1. **Log quality drives detection**: Structured, consistent log formats significantly improve correlation accuracy
2. **Framework mapping adds value**: Connecting technical findings to NIST/MITRE makes reports actionable for governance teams
3. **Isolation is critical**: Host-Only networking prevented accidental impact on external systems during testing
4. **Documentation is part of the product**: Clear reports transform technical work into business value

## Future Enhancements
- [ ] Add active response rules to auto-block attacking IPs via iptables
- [ ] Integrate threat intelligence feeds for IoC enrichment
- [ ] Expand detection rules for lateral movement patterns (T1021, T1078)
- [ ] Automate report generation with Wazuh API + Python scripting

## Repository
🔗 [https://github.com/kushaniC/soc-simulation-lab](https://github.com/kushaniC/soc-simulation-lab)

## Stack
- Wazuh 4.7.5, OpenSearch Dashboard
- Ubuntu 22.04 LTS, Kali Linux 2024.x
- VMware Workstation/Player (NAT + Host-Only networking)
- NIST CSF 2.0, MITRE ATT&CK v13, CVSS v3.1

