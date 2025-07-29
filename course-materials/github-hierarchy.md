# GitHub Enterprise Cloud Hierarchy

```mermaid
graph TD
    %% Enterprise Level
    Enterprise["Acme Inc"] 
    
    %% Organization Level
    Org1["Engineering"]
    Org2["Marketing"]
    Org3["Finance"]
    
    %% Individual User
    User["jsmith"]
    
    %% Repository Level - Org Owned
    Repo1["api-service"]
    Repo2["web-client"]
    Repo3["docs"]
    Repo4["website"]
    Repo5["analytics"]
    Repo6["budget-app"]
    
    %% Repository Level - User Owned
    UserRepo["personal-project"]
    
    %% Connections - Enterprise to Orgs
    Enterprise --> Org1
    Enterprise --> Org2
    Enterprise --> Org3
    
    %% Connections - Orgs to Repos
    Org1 --> Repo1
    Org1 --> Repo2
    Org1 --> Repo3
    
    Org2 --> Repo4
    Org2 --> Repo5
    
    Org3 --> Repo6
    
    %% Connections - User to Repos
    User --> UserRepo
    
    %% Styling with colorblind-friendly colors
    classDef enterprise fill:#0072B2,stroke:#000,stroke-width:2px,color:white,font-weight:bold;
    classDef org fill:#009E73,stroke:#000,stroke-width:1px,color:white,font-weight:bold;
    classDef user fill:#CC79A7,stroke:#000,stroke-width:1px,color:white,font-weight:bold;
    classDef repo fill:#F0E442,stroke:#000,stroke-width:1px,color:black,font-weight:bold;
    
    %% Add rounded corners and increase node size
    classDef enterprise rx:10,ry:10;
    classDef org rx:8,ry:8;
    classDef user rx:8,ry:8;
    classDef repo rx:5,ry:5;
    
    %% Apply styles
    class Enterprise enterprise;
    class Org1,Org2,Org3 org;
    class User user;
    class Repo1,Repo2,Repo3,Repo4,Repo5,Repo6,UserRepo repo;
    
    %% Improve vertical alignment
    linkStyle default stroke-width:1.5px;
```

## Understanding the GitHub Enterprise Cloud Hierarchy

The diagram above illustrates the hierarchical structure of GitHub Enterprise Cloud:

1. **Enterprise Level**: The top-level container that represents your GitHub Enterprise Cloud account.
   - Example: `github.com/enterprises/acme`

2. **Organization Level**: Organizations are shared accounts where businesses and open-source projects can collaborate across many projects at once.
   - Example: `github.com/acme-eng`

3. **Individual User Level**: Individual GitHub users who can own repositories directly.
   - Example: `github.com/jsmith`

4. **Repository Level**: Repositories contain all of your project's files and each file's revision history. As shown in the diagram, repositories can be owned by either:
   - Organizations: `github.com/acme-eng/api-service`
   - Individual users: `github.com/jsmith/personal-project`

This hierarchical structure is important for understanding how GitHub Copilot governance works, as policies and settings can be applied at different levels of this hierarchy. For example, Copilot access can be managed at the enterprise level and cascade down, or be configured differently at the organization or repository level.

