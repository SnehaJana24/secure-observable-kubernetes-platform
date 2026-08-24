\# 🔐 Secure \& Observable Kubernetes Platform



A DevSecOps-focused Kubernetes project demonstrating \*\*Docker security hardening, Trivy vulnerability scanning, GitHub Actions CI, Prometheus monitoring, Grafana dashboards, and alerting\*\*.



\---



\## 🚀 Project Overview



This project deploys a containerized Node.js application on \*\*Kubernetes using Minikube\*\*.



The application provides:



\- `/health` — application health status

\- `/metrics` — Prometheus metrics



Security and observability are integrated into the deployment workflow.



\---



\## 🏗️ Architecture



```text

Git Push

&#x20;  │

&#x20;  ▼

GitHub Actions

&#x20;  │

&#x20;  ├── Docker Build

&#x20;  └── Trivy Security Scan

&#x20;           │

&#x20;           ▼

&#x20;     0 HIGH / 0 CRITICAL

&#x20;           │

&#x20;           ▼

&#x20;      Kubernetes

&#x20;       (Minikube)

&#x20;           │

&#x20;           ▼

&#x20;     Node.js Application

&#x20;        /health

&#x20;        /metrics

&#x20;           │

&#x20;           ▼

&#x20;       Prometheus

&#x20;           │

&#x20;           ▼

&#x20;        Grafana

&#x20;      Dashboard + Alert

```



\---



\## 🛠️ Technologies



\- \*\*Node.js\*\* — Application

\- \*\*Docker\*\* — Containerization

\- \*\*Kubernetes / Minikube\*\* — Deployment

\- \*\*Trivy\*\* — Container security scanning

\- \*\*GitHub Actions\*\* — CI security pipeline

\- \*\*Prometheus\*\* — Metrics collection

\- \*\*Grafana\*\* — Monitoring and alerting



\---



\## 🔒 Docker Security Hardening



The Docker image is hardened by:



\- Using the lightweight `node:20-alpine` base image

\- Upgrading Alpine packages

\- Installing only production dependencies

\- Cleaning the npm cache

\- Removing npm from the final runtime image

\- Running the application directly with Node.js



Key Dockerfile steps:



```dockerfile

RUN apk update \&\& apk upgrade --no-cache



RUN npm ci --omit=dev \&\& npm cache clean --force



RUN rm -rf /usr/local/lib/node\_modules/npm



CMD \["node", "index.js"]

```



\---



\## 🛡️ Trivy Security Scanning



The Docker image is scanned for HIGH and CRITICAL vulnerabilities:



```bash

trivy image --severity HIGH,CRITICAL --ignore-unfixed --scanners vuln secure-observable-app:test

```



\### Latest Scan



```text

HIGH:     0

CRITICAL: 0

```



The GitHub Actions security workflow automatically runs on pushes and pull requests to `main`.



The workflow:



```text

Checkout

&#x20;  ↓

Node.js Setup

&#x20;  ↓

Install Dependencies

&#x20;  ↓

Docker Build

&#x20;  ↓

Trivy Security Scan

```



\---



\## ☸️ Kubernetes Deployment



The application runs with \*\*2 replicas\*\* in Minikube and is exposed using a Kubernetes NodePort service.



Example deployment:



```bash

minikube image load secure-observable-app:test



kubectl set image deployment/secure-observable-app \\

&#x20; secure-observable-app=secure-observable-app:test



kubectl rollout status deployment/secure-observable-app

```



Verify:



```bash

kubectl get pods

kubectl get deployment secure-observable-app

```



\---



\## 📊 Prometheus Monitoring



Prometheus collects application metrics through a Kubernetes \*\*ServiceMonitor\*\*.



Important metrics:



```text

app\_requests\_total

app\_health\_status

```



Normal application health:



```text

app\_health\_status 1

```



The application exposes metrics through:



```text

/metrics

```



\---



\## 🚨 Grafana Alerting



Grafana monitors the application health metric using:



```promql

min(app\_health\_status)

```



The alert fires when:



```text

app\_health\_status < 1

```



The alert lifecycle was successfully tested:



```text

Normal → Pending → Firing → Normal

```



This verifies that an unhealthy application can be detected, trigger an alert, and automatically return to a healthy state after recovery.



\### Notifications



A Slack/PagerDuty contact point was intentionally left unconfigured for this local Minikube demonstration.



The alert detection and recovery lifecycle was fully tested. In a production environment, the same alert can be connected to Slack, email, PagerDuty, or another notification system.



\---



\## 🐞 Problems Encountered \& Resolved



\### 1. Duplicate `server.listen()` causing container crashes



An early version of the application contained two `server.listen(PORT)` calls, causing the container to crash with `ERR\_SERVER\_ALREADY\_LISTEN`.



The issue was diagnosed using:



```bash

kubectl logs

```



The duplicate call was removed and a new Docker image was built.



\### 2. Minikube using a stale Docker image



After fixing the application, Kubernetes continued running the old image because Minikube maintains its own image store.



The corrected image was loaded explicitly:



```bash

minikube image load secure-observable-app:test

```



The Deployment was then updated to use the new image.



\### 3. Local port conflict



A request to `localhost:3000` returned an unexpected login redirect.



The issue was traced to another local service already using port `3000`.



Using a different host port resolved the conflict:



```bash

docker run -d --name secure-observable-test \\

&#x20; -p 3005:3000 \\

&#x20; secure-observable-app:test

```



\---



\## ✅ Project Status



| Feature | Status |

|---|---|

| Docker containerization | ✅ |

| Docker security hardening | ✅ |

| Trivy vulnerability scanning | ✅ |

| 0 HIGH/CRITICAL vulnerabilities | ✅ |

| GitHub Actions security scan | ✅ |

| Kubernetes deployment | ✅ |

| 2 application replicas | ✅ |

| Prometheus monitoring | ✅ |

| ServiceMonitor | ✅ |

| Grafana dashboard | ✅ |

| Grafana alerting | ✅ |

| Alert failure \& recovery test | ✅ |---



\## 🔮 Future Improvements



\- Slack / Email / PagerDuty notifications

\- Centralized logging with Loki

\- SBOM generation

\- Container image signing

\- Kubernetes security scanning

\- Network policies



\---



\## 👩‍💻 Author



\*\*Sneha Jana\*\*



GitHub: \[@SnehaJana24](https://github.com/SnehaJana24)

