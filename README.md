# Ecommerce-Server

### Tasks
  
[*] - Test available API's  
[*] - Validation error message to show actual sql query issue  
[*] - Write missing API's  
[*] - Migrations  
[*] - Implement Caching (Redis)  
[-] - Performance Optimisation
[-] - Middleware and Security (Check out ways to improve security e.g., HTTPS, CSRF protection, input validation, etc):  
[-] - Write Tests (Unit, Integration, End to end - Mocha, Assertionn libraries like Chai, Jest)  
[-] - Set up CI/CD (for tests too, Jenkins)  
[-] - Containerization and Orchestration (Docker, Kubernetes)  
[-] - Web Servers (- Apache or Nginx)  
[*] - Payment Gateway  
[-] - API Documentation
[-] - Other Authentication strategies (OAuth, JWT-Based Authorization and Role-Based Access Control (RBAC) etc)  
    
    
### Just for Learning purposes
  
[] - Microservice - (Break down this monolithic application into microservices, message broker (e.g., RabbitMQ, Redis) for inter-service communication, Scalable Architecture with Load Balancing)  
[] - API (check out GraphQL - schemas and resolvers)  
[] - Dependency Injection (InversifyJS)  
[] - Serverless Architecture (Check out AWS Lambda, Azure Functions, or Google Cloud Functions)  
[] - Logging and Monitoring (Prometheus, ELK Stack)  
[] - Machine Learning Integration - Use a pre-trained model for specific functionality (e.g., image recognition). and   
[] - Blockchain and Decentralized Applications (DApps) - Build a decentralized application on a blockchain platform (e.g., Ethereum, Implement smart contracts for specific functionalities, Use a blockchain network for decentralized data storage).
[] - Event Based Programming
[] - Linux
[] - Portfolio

# Notes

[-] - Performance Optimisation: Use Asynchronous and Non-Blocking Operations, Optimize Memory Usage(Avoid memory leaks by properly handling closures, event listeners, and database connections, like heap snapshots and garbage collection analysis to identify and optimize memory-intensive cod) (Profiling tools like clinic or New Relic, flamegraphs , Caching , Gzip Compression, Load Balancing (nginx), Vertical Scaling (increase server cpu, ram), Horizontal Scaling (add more servers), Optimizing Database Operations (Indexing, Connection Pooling, query optimization), Worker Threads, Throttling(vs debounce) Rate Limiting, DB indexing and constraints etc - https://expressjs.com/en/advanced/best-practice-performance.html),  memory-intensive operations, like processing large files or streams, use techniques such as chunking or streaming, parallel processing techniques like worker threads or the cluster module, process manager (pm2, forever)
[-] - Middleware and Security (Check out ways to improve security e.g., HTTPS, CSRF protection, input validation, etc):
Protect From Query Injections(input validation, using ORMS rather than raw queries and With Parameterized Queries), HTTP Headers(helmet), Don’t Run Node.js With A Root User, strong auth and Use 2FA, Accept Only Small-Sized Payloads (limit by expressbodyparser), Against XSS (sanitise and escape user generated content b4 running in browser), Against brute-force attacks {DOS, DDOS} (Implementing Rate Limiting, express-bouncer, CAPTCHA usage), Regular expression denial of service (REDoS) attacks (input validation), Avoid Pyramid of Doom {callbacks} (use promises instead, and async await), Do not block the event loop, Monitor the event loop (toobusy-js), Only return what is necessary from ur apis, Enforce HTTPS to encrypt communication between clients and servers, preventing eavesdropping and man-in-the-middle attacks (helmet)
Logging & monitoring, Strong authentication policies, Avoid blocking event loop, Safe error handling, Don't send unnecessary information, Limit request sizes, Validate user inputs, Ensure secure deserialization, Security linters & SAST tools, Run as non-root user  