const QUESTIONS=[
{id:1,text:"Consider the action represented in the picture. When called at runtime, there is an exception raised in the highlighted CreateAddress Action call. What is the expected behavior of the Actions after the Exception is raised?\n\n[DatabaseException Handler: Abort Transaction=Yes; Fluxo: GetCities→SetCity→CreateCity→SetAddress→CreateAddress (falha); Exceção: Createaudit→End]",
options:["A. There are only new city and Audit records added to the database.","B. There are new city, Address and audit records added to database.","C. There is only a new Audit record added to the database.","D. There are no new records added to the database."],correct:"C",
explanation:"Abort Transaction=Yes faz rollback de tudo (CreateCity, etc). Só o Createaudit (no handler, nova transação) é guardado."},

{id:2,text:"What could be a valid reason for a consumer Module to not be appearing in the list of entity Module, while debugging in the producer Module?",
options:["A. The consumer Module is not a UI Module or it is not set as a home Module.","B. Dependencies need to be refreshed in the producer Module.","C. Dependencies need to be refreshed in the consumer Module.","D. The consumer Module does not have any breakpoints defined."],correct:"C",
explanation:"As dependências do consumidor precisam estar atualizadas para aparecer na lista de debug do produtor."},

{id:3,text:"Consider the following entity diagram (Country, City, Address). The system regularly deletes all City information for cities not assigned to a country or not referenced by any address. Which approach has the best performance?",
options:["A. Use a single Advanced SQL element with a DELETE statement.","B. Use an aggregate to get the list of city records to delete, iterate through the list and use the DeleteCity entity action.","C. Use an aggregate to get the list of city records to delete, generate a list with the ids and input to an Advanced SQL element with a single DELETE statement.","D. Use an Advanced SQL element to select the id's of city records to delete, iterate through the list and use the DeleteCity Entity Action."],correct:"A",
explanation:"Um único DELETE em Advanced SQL é o mais performático — evita múltiplos round-trips à BD."},

{id:4,text:"Which of the following options describes qualities that a timer used for batch processing requires?",
options:["A. Never reaches the timeout limit and ensures all work will eventually be finished.","B. Does not have a schedule defined and when executed, it dynamically adjusts its timeout to fit the full work in one run.","C. Scheduled to run daily at short intervals and does not repeat any work.","D. Guarantees the integrity of any modified data and has a timeout that allows the full workload to be completed."],correct:"D",
explanation:"Timer de batch deve garantir integridade dos dados E gerir o timeout. Nota: A opção A também é considerada válida no documento original."},

{id:6,text:"The GetOrders Aggregate data doesn't change often but thousands of users will access the screen simultaneously. What is the best way to avoid performance degradation in the database?",
options:["A. Change the aggregate's MaxRecords property to a smaller number for faster data retrieval.","B. Set the Aggregate's Cache in Minutes property to the average time the data is being accessed.","C. Remove the Aggregate from the Data Action and place it on the Screen directly.","D. Perform the calculations asynchronously by waking a timer and store the result in a site property."],correct:"B",
explanation:"Cache in Minutes partilha o resultado entre todos os utilizadores, reduzindo drasticamente queries à BD."},

{id:7,text:"Testing a REST API call to get IP info returned 200 OK. But in the app, the city field appears empty. What's the cause?",
options:["A. The response test result was not copied to the response body of the REST API.","B. The city attribute in the response Structure has its Default Value set to empty text.","C. The attributes in the response Structure do not follow the same order of the original JSON.","D. The City attribute in the response Structure has its Name in JSON property set to a different value than specified in the JSON response."],correct:"D",
explanation:"Quando o 'Name in JSON' não coincide com a chave no JSON da resposta, o campo fica vazio."},

{id:8,text:"How to redirect a user from the Doctors app to the AppointmentList screen on the Appointments App when clicking a button?",
options:["A. Set Destination to RedirectToURL with hardcoded URL.","B. Set Destination to RedirectToURL with a Site Property holding the URL.","C. Reference the Screen from the Appointments App and select it as the Destination of the Button.","D. Use an Iframe with the AppointmentList Screen URL in the source tag."],correct:"C",
explanation:"Referenciar diretamente o ecrã garante URL gerada pela plataforma e funciona em todos os ambientes."},

{id:9,text:"Homebanking dashboard: account info + 50 latest transactions + global balance chart (from multiple systems). Which option gives best performance and UX?",
options:["A. Define two Screen Aggregates (account info + transactions) and a Data Action for the chart.","B. Define an OnInitialize Event Handler calling three server actions.","C. Define one single data action for everything.","D. Define one single Screen Aggregate for account info and transactions, and a Data Action for the chart."],correct:"A",
explanation:"Screen Aggregates executam em paralelo e assincronamente. Separar queries + Data Action permite carregamento independente."},

{id:10,text:"An Action calculates employee bonus using hardcoded percentages that change frequently. Best approach following OutSystems best practices?",
options:["A. Create Comment elements with Reminder=Yes to find hardcoded values easily.","B. Create a static entity with a record for each percentage.","C. Create a Site property for each percentage (changeable in Service Center).","D. Create an Entity to save percentages and a Screen for an administrator to edit them."],correct:"D",
explanation:"Entity + ecrã de admin permite mudar valores sem deployment e dá controlo total ao negócio."},

{id:11,text:"Insurance claims system growing slower. SLA=4 months. Audits every 6 months. Records kept for the relationship duration. How to improve performance?",
options:["A. Create ClaimBackup Entity merging both entities. Use Light Process to move records older than 4 months.","B. Define indexes on all searchable attributes and trigger async saves.","C. Replicate Claim and ClaimDocument in backup Entities. Timer moves closed claims older than 4 months. Separate screens for backup data.","D. Use StartIndex and MaxRecords local variables with On Scroll Ending handler."],correct:"C",
explanation:"Archiving em entidades de backup mantém tabelas principais pequenas e performáticas sem perder dados de audit."},

{id:12,text:"GetAllApplications Action wraps a GetApplications Aggregate. What's a good reason to use the Aggregate directly instead?",
options:["A. Promotes independence between Actions that use it.","B. Allows the platform to optimize based on what's used in each Action.","C. Allows Actions to cache results based on their needs since caching can only be performed on Aggregates.","D. There would be no reason to replace the Action call."],correct:"C",
explanation:"Cache in Minutes só está disponível em Aggregates, não em Server Actions. Chamar diretamente permite cachear individualmente."},

{id:13,text:"Debugging a public server Action on another module. Which statement is FALSE?",
options:["A. You need permission to publish the consumer Module.","B. The server Action needs to be referenced in the consumer Module.","C. The trigger to execute the Action needs to come from a Screen.","D. The reference to the producer Module needs to be up to date."],correct:"C",
explanation:"FALSO: o trigger pode vir de qualquer ponto (Timer, Action, etc.) — não precisa ser de um Screen."},

{id:14,text:"Timer processes file expenses and wakes a second Timer before ending. What happens if the first timer times out?",
options:["A. Changes saved, second Timer does not run.","B. Changes rollbacked, second timer does not run.","C. Changes saved, second timer still triggered.","D. Changes rollbacked, but second timer still triggered to run."],correct:"D",
explanation:"Timeout = rollback da transação atual. Mas o Wake do segundo Timer já foi chamado (operação independente) — segundo Timer executa."},

{id:15,text:"AddStock Server Action: Start → OrderCreate (Service Action) → OrderProductsCorrect → End. Requirement: rollback all changes if one fails. Which is correct?",
options:["A. No transaction handling needed; AddStock retries until successful.","B. If OrderProductsCreate fails, additional logic is needed to rollback OrderCreate changes.","C. If OrderCreate fails, its changes auto-rollback and AddStock stops.","D. If OrderProductsCreate fails, both Actions auto-rollback."],correct:"B",
explanation:"OrderCreate é Service Action (transação separada). Se OrderProductsCreate falha, o rollback é só local — é preciso lógica de compensação para o OrderCreate."},

{id:16,text:"Employee Entity used across apps. Needs frequent reads and controlled create/update with shared business rules. What strategy?",
options:["A. Public=Yes, Expose Read Only=No. Consumers use entity Actions directly. Business rules in each app.","B. Public=Yes, Expose Read Only=Yes. Wrapper Actions with business rules exposed. Consumers use Aggregates to read and wrappers to write.","C. Public=No. Wrapper Actions for all operations exposed.","D. Public=Yes, Expose Read Only=No. Wrapper Actions exposed but entity Actions also available."],correct:"B",
explanation:"Entity pública Read-Only para queries eficientes via Aggregates + Wrapper Actions centralizam regras de negócio para escrita."},

{id:17,text:"External SQL Server database via Integration Builder. Which action CANNOT be performed with external Entities?",
options:["A. Use as output Entity/Structure of an Advanced SQL element.","B. Create an Aggregate with external Entity as Source on a Screen.","C. Create a Join between an external Entity and a local Entity.","D. Use Create or Delete Entity Actions for external Entity records."],correct:"C",
explanation:"Entidades externas não podem fazer JOIN com entidades locais — estão em bases de dados diferentes."},

{id:18,text:"Integration Builder: what does 'Keep Database NULLs' mean?",
options:["A. NULLs fetched as NULL, saved back with Integration Builder default values.","B. NULLs fetched and saved as NULL, kept as NULL in runtime logic.","C. NULLs fetched and saved as Integration Builder default values.","D. NULLs fetched and saved as NULL in DB, but represented in OutSystems with Integration Builder default values."],correct:"D",
explanation:"NULLs mantidos na BD, mas na lógica OutSystems são representados com valores default (0, \"\", etc.)."},

{id:19,text:"Which information appears in General Logs in Service Center?",
options:["A. Database exceptions and Screen access.","B. Screen accesses and user logins.","C. Logs created with the LogMessage Action and slow queries.","D. Slow queries and timer execution durations."],correct:"C",
explanation:"General Logs: LogMessage Action + slow queries. Screen accesses e timers ficam nos seus logs próprios."},

{id:20,text:"When is the OnDestroy Event triggered in Blocks?",
options:["A. Before the Block is removed from the DOM and after the parent's Screen OnDestroy is triggered.","B. Never, Blocks do not trigger the OnDestroy Event.","C. Before the Block is removed from the DOM and before the parent's Screen OnDestroy Event.","D. After the Block and the Screen are both removed from the DOM."],correct:"A",
explanation:"OnDestroy do Block: depois do Screen OnDestroy do pai, mas antes do Block ser removido do DOM."},

{id:21,text:"Client Action fetches customer locations: GetCustomerCountries → Loop → GetCitiesByCountry (Server Action) → ListAppendAll. Which statement is correct?",
options:["A. GetCustomerCountries should be replaced by a direct database query.","B. Avoid calling multiple server Actions in the same client Action flow, especially in a loop.","C. Set cache in Minutes on GetCitiesByCountry to cache until loop finishes.","D. Service Studio will show an error because you cannot call server Actions in a loop."],correct:"B",
explanation:"Server Actions num loop = N round-trips ao servidor. Anti-pattern crítico de performance."},

{id:22,text:"Which of the following statements is correct?",
options:["A. The Effective values of site properties can be modified in Service Center, but not the default value.","B. Client Variables are reset to their default values when the user closes the browser.","C. Site properties can be used as the value of an Expression Widget on the Screen.","D. The value of a client variable can be of any basic data type, Entity Identifiers and Entity records."],correct:"A",
explanation:"Service Center permite alterar valores Effective das Site Properties sem redeploy. O Default só muda com nova publicação."},

{id:23,text:"Timer Action: ensure logic runs for 10 minutes then wakes a new timer instance. What should be the Timeout assignment and If condition?",
options:["A. Assign: Timeout += 10; Condition: CurrDateTime() = Timeout","B. Assign: Timeout = AddMinutes(CurrDateTime(),10); Condition: Timeout < CurrDateTime()","C. Assign: Timeout += 10; Condition: Timeout < CurrDateTime()","D. Assign: Timeout = AddMinutes(CurrDateTime(),10); Condition: CurrDateTime() >= Timeout"],correct:"D",
explanation:"Timeout = agora + 10 min. Condição de saída: CurrDateTime() >= Timeout (já passou o tempo?)."},

{id:24,text:"Action with multiple queries in a loop. Which best practice improves performance?",
options:["A. Always prefer Advanced SQL over Aggregates for optimization.","B. Prefer Aggregates over Advanced SQL for caching output.","C. When possible, replace multiple queries with a single query even if more complex.","D. Refactor Aggregates into independent and reusable Client Actions."],correct:"C",
explanation:"Consolidar múltiplas queries num único query (com JOINs) elimina round-trips em loop."},

{id:25,text:"Form with medical info + file upload calls SendForm Server Action → REST API. How to guarantee no data is lost with best performance?",
options:["A. No further action needed if Form validations are defined.","B. Error handling flow to retry until data is saved.","C. Save to temp Entity, trigger timer to send async in batches.","D. Create OnAfterResponse Handler for the REST API to inform user of success/error."],correct:"D",
explanation:"OnAfterResponse Handler permite informar o utilizador se houve erro e se precisa resubmeter."},

{id:26,text:"Process Excel file with thousands of records for employee bonus calculation. Best approach?",
options:["A. Timer with increased Timeout and Low priority.","B. Timer controlling execution duration, scheduled every 5 minutes.","C. Read 2000 records at a time, use Cyclic_Job Last_Run to manage batches.","D. Timer processing in batches, controlling timeout to re-wake before reaching limit."],correct:"D",
explanation:"Processar em batches + controlar timeout + re-wake do timer = padrão correto para grandes volumes."},

{id:27,text:"Exposing a REST API with API Key + App Identifier authentication. Which is NOT valid?",
options:["A. Create Entity for API Key – App Identifier pairs.","B. Read the API Key – App Identifier pair in the OnRequest callback Action.","C. Validate keys in the OnAuthentication callback Action.","D. Set authentication property to Custom."],correct:"B",
explanation:"OnRequest é para processar/transformar pedidos, NÃO para autenticação. A autenticação vai no OnAuthentication."},

{id:28,text:"Jane tries to publish a module with conflicts. What happens with 'Merge and Publish'?",
options:["A. The Compare and Merge window opens for Jane to resolve conflicts before publishing.","B. Non-conflicting changes merge; Jane's conflicting changes are kept, old discarded.","C. Service Studio throws an error; Jane must check logs.","D. Non-conflicting changes merge; older conflicting versions kept, Jane's discarded."],correct:"A",
explanation:"'Merge and Publish' abre a janela Compare and Merge para resolver cada conflito manualmente."},

{id:29,text:"You can see web service logs but not request/response values. Why?",
options:["A. Service Center doesn't display that; check in Service Studio.","B. The logging level of the web service is not correctly defined.","C. The web services are not being used by any apps.","D. The web service is throwing an error."],correct:"B",
explanation:"O logging level controla o detalhe registado. Sem nível 'Full', request/response não aparecem."},

{id:30,text:"Property Entity with Description (Text 1500) and HighlightedPicture (BinaryData). How to improve query performance when filtering by partial description match?",
options:["A. Replace HasParking/HasGarage Booleans with integers.","B. Break Entity in two: basic details + remaining attributes.","C. Create an index on Description attribute.","D. Create a new extension Entity with HighlightedPicture and HighlightedLabel attributes."],correct:"D",
explanation:"Mover BinaryData para entidade de extensão reduz tamanho dos registos. Queries com filtro por Description ficam mais rápidas."},

{id:31,text:"Which of the following statements about Client Variables in OutSystems Reactive Web is correct?",
options:["A. Client Variables are shared between all users of the application.","B. Client Variables persist in the browser and survive page refreshes.","C. Client Variables can store Entity Records and Lists.","D. Client Variables are automatically cleared when the user logs out."],correct:"B",
explanation:"Client Variables são guardadas no localStorage do browser — persistem entre page refreshes mas são específicas de cada utilizador/browser. Não suportam Entity Records e não são limpas automaticamente no logout."},

{id:32,text:"When does the OnParametersChanged event handler execute on a Reactive Screen?",
options:["A. Once, immediately after the Screen is first rendered.","B. Every time the Screen is rendered, including the first load.","C. When the Screen is already active in the browser and its URL input parameters change.","D. When a Block inside the Screen updates its own input parameters."],correct:"C",
explanation:"OnParametersChanged só é acionado quando o utilizador já está no ecrã e os parâmetros do URL mudam (ex: navegar do produto 1 para o produto 2 sem sair do ecrã). Na primeira carga usa-se OnInitialize."},

{id:33,text:"What is the main advantage of using the If Widget over hiding a widget with CSS (e.g., display:none)?",
options:["A. The If Widget improves SEO by generating cleaner semantic HTML.","B. The If Widget removes the element and its children entirely from the DOM, avoiding unnecessary rendering.","C. The If Widget allows the condition to be evaluated on the server before the page is sent.","D. The If Widget automatically triggers OnRender on any Blocks that become visible."],correct:"B",
explanation:"O If Widget remove o elemento do DOM quando a condição é falsa — os Blocks filhos não são inicializados nem fazem pedidos ao servidor. Esconder via CSS mantém tudo no DOM, consumindo memória e podendo disparar eventos desnecessários."},

{id:34,text:"Which statement correctly differentiates a Service Action from a Server Action in OutSystems?",
options:["A. Service Actions run in the browser context; Server Actions run on the server.","B. Service Actions are exposed as REST endpoints automatically; Server Actions are not.","C. Service Actions do not run inside a database transaction by default, unlike Server Actions.","D. Service Actions can only be called from Timers and Processes."],correct:"C",
explanation:"Server Actions correm sempre dentro de uma transação de BD. Service Actions, por defeito, NÃO correm numa transação — o que é crítico para orquestração entre módulos onde se quer evitar locks."},

{id:35,text:"In the OutSystems 4 Layer Canvas architecture, which layer is responsible for End-User facing applications with Screens and UI logic?",
options:["A. Foundation Layer","B. Core Services Layer","C. Orchestration Layer","D. End-User Layer"],correct:"D",
explanation:"O End-User Layer contém os módulos com Screens e UI destinados ao utilizador final. Foundation = utilitários reutilizáveis. Core Services = lógica e dados de negócio. Orchestration = orquestração de processos entre Core Services."},

{id:36,text:"A Human Activity in a BPT Process has a deadline set but no On Timeout Action defined. What happens when the deadline is reached?",
options:["A. The process instance is immediately aborted and all data rolled back.","B. The Human Activity is automatically reassigned to a manager user.","C. The Human Activity is closed and the process flow continues to the next step.","D. The Human Activity remains open indefinitely, ignoring the deadline."],correct:"C",
explanation:"Sem um On Timeout Action definido, quando o deadline é atingido o OutSystems fecha a Human Activity e avança o processo para a próxima atividade. Para lógica customizada (escalação, notificação) é necessário definir o On Timeout."},

{id:37,text:"A developer needs to send a personalized email with dynamic content to users. Which of the following is NOT supported in an OutSystems Email Screen?",
options:["A. Using input parameters to personalize the email body.","B. Running a Client Action or JavaScript at the moment the email is opened.","C. Using Aggregates to fetch data to include in the email.","D. Attaching a binary file using the Attachments parameter of Send_Email."],correct:"B",
explanation:"Email Screens são geradas e renderizadas no servidor — não existe contexto de browser. JavaScript e Client Actions não são executados. Aggregates, input parameters e anexos binários são totalmente suportados."},

{id:38,text:"A Screen Action is protected with the 'Registered' Role. What happens when an anonymous (not logged in) user tries to access that Screen?",
options:["A. The action executes normally but filters data to return only public records.","B. The user is automatically redirected to the application's login page.","C. A Security Exception is raised and the user sees a generic error page.","D. The request is silently ignored and the user stays on the current screen."],correct:"B",
explanation:"Quando um utilizador anónimo tenta aceder a um ecrã protegido com role 'Registered' (ou qualquer role específica), a plataforma redireciona automaticamente para o ecrã de login definido nas propriedades da app."},

{id:39,text:"A Screen Aggregate has the 'Cache in Minutes' property set to 10 minutes. The Aggregate also uses a local variable as a filter that changes based on user input. What is the caching behavior?",
options:["A. The Aggregate result is cached for 10 minutes regardless of the filter variable value.","B. The Aggregate result is never cached because a dynamic input variable invalidates the cache configuration.","C. The cache stores one result per unique value of the filter variable, each valid for 10 minutes.","D. The Cache in Minutes property is ignored when the Aggregate is placed directly on a Screen."],correct:"C",
explanation:"A cache dos Aggregates funciona por combinação única de parâmetros de entrada. Cada valor diferente da variável gera uma entrada de cache separada, cada uma válida durante 10 minutos. O cache não é desativado — é segmentado por inputs."},

{id:40,text:"What is the correct way to apply a custom CSS class to an OutSystems widget at design time without modifying the base Theme?",
options:["A. Set the Style Classes property of the widget with the class name.","B. Add the class in the Extended Properties with Name='class' and Value='my-class'.","C. Create a new Theme that extends the base theme and override the class there.","D. Use a JavaScript action on OnRender to add the class to the element dynamically."],correct:"A",
explanation:"A propriedade 'Style Classes' do widget é a forma correta e recomendada de aplicar classes CSS personalizadas em design time. 'Extended Properties' também funciona mas é usado para atributos HTML arbitrários. A Style Classes property é a abordagem official."},

{id:41,text:"What defines a Weak Dependency between OutSystems modules?",
options:["A. A dependency on a module that has been marked as deprecated.","B. A reference that does not require the consumer module to be republished when the producer's implementation changes.","C. A dependency to a module in a different application.","D. Any reference to a module in the Foundation Layer from a module in the End-User Layer."],correct:"B",
explanation:"Weak Dependencies (ex: referência a Service Actions ou elementos de serviço) não propagam a necessidade de republicação ao consumidor quando apenas a implementação do produtor muda. Só mudanças de interface (assinatura) obrigam o consumidor a atualizar a referência."},

{id:42,text:"When consuming an external SOAP Web Service in OutSystems Service Studio, which statement is correct?",
options:["A. SOAP Web Services can only be consumed through Integration Builder, not directly in Service Studio.","B. The platform automatically generates Actions for each SOAP operation defined in the WSDL.","C. SOAP responses must be manually mapped to OutSystems Structures by the developer.","D. SOAP authentication always requires adding custom headers via an OnBeforeRequest callback."],correct:"B",
explanation:"Ao importar um SOAP Web Service via WSDL no Service Studio, a plataforma gera automaticamente Actions, Structures e Data Types para cada operação definida — sem mapeamento manual. SOAP pode ser importado diretamente no Service Studio sem Integration Builder."},

{id:43,text:"What is the purpose of Local Storage Entities in OutSystems Mobile and Reactive Web applications?",
options:["A. To store frequently accessed server-side data in a faster database tier.","B. To persist data on the user's device, enabling offline usage scenarios.","C. To automatically cache REST API responses without additional configuration.","D. To share data between different OutSystems applications installed on the same device."],correct:"B",
explanation:"Local Storage Entities guardam dados no dispositivo do utilizador (SQLite em mobile, IndexedDB em web). São essenciais para cenários offline — o utilizador pode trabalhar sem conectividade e sincronizar com o servidor quando a ligação for restaurada."},

{id:44,text:"A Reactive Web Screen has a Form with an Email input field marked as Mandatory. How should the developer validate the form before calling a Server Action on button click?",
options:["A. Set the Mandatory property on the Input widget to True and call the built-in ValidateForm() function in the button's On Click action before calling the Server Action.","B. Add an OnBeforeSubmit event handler on the Form widget.","C. Create a JavaScript action with a regex pattern to validate the email on button click.","D. Use an If widget to check the field value before calling the server action, and show an error message manually."],correct:"A",
explanation:"Em Reactive, a abordagem recomendada é: definir Mandatory=True (e outros validators como Format) no Input widget + chamar ValidateForm() no On Click da action antes de invocar o Server Action. ValidateForm() aciona todas as validações declarativas e retorna False se houver erros."},

{id:45,text:"What is the purpose of the OnBeforeRequest callback when consuming a REST API in OutSystems?",
options:["A. To handle HTTP error responses (4xx, 5xx) returned by the external API.","B. To modify the outgoing request, such as adding authentication headers or query parameters.","C. To transform the JSON response body before it is mapped to OutSystems Structures.","D. To log the request to Service Center before it is sent to the external service."],correct:"B",
explanation:"OnBeforeRequest é chamado antes de o pedido ser enviado para a API externa. É o local correto para adicionar headers (ex: Authorization, API-Key), modificar o URL ou o body. Para tratar respostas de erro usa-se OnAfterResponse."},

{id:46,text:"What is the primary role of LifeTime in an OutSystems infrastructure?",
options:["A. It provides a real-time performance monitoring dashboard for individual Screens and Aggregates.","B. It manages the deployment of applications across multiple environments (e.g., Development, QA, Production).","C. It stores and centralizes all application logs from all environments.","D. It allows developers to edit and publish OutSystems modules without using Service Studio."],correct:"B",
explanation:"LifeTime é a consola de gestão de deployment do OutSystems. Controla a promoção de aplicações entre ambientes, gere permissões por ambiente e mantém o histórico de versões. Os logs ficam no Service Center de cada ambiente; monitoring usa LifeTime Analytics."},

{id:47,text:"A developer consumes an external REST API. The API returns HTTP 400 with a JSON error body when validation fails. What is the correct way to handle this in OutSystems?",
options:["A. Wrap the REST API call in a Try-Catch and handle the Database Exception.","B. Create an OnAfterResponse callback to inspect the HTTP status code and raise a User Exception with details from the error body.","C. The platform automatically raises a User Exception for any non-200 HTTP response.","D. Use an All Exceptions handler after the REST call and read the error from the response structure."],correct:"B",
explanation:"Por defeito, o OutSystems só lança exceção para erros de rede. Para tratar erros HTTP (400, 404, 500...) é necessário um OnAfterResponse que leia o StatusCode e o body de erro, e levante uma User Exception com os detalhes. O All Exceptions não recebe o body da resposta automaticamente."},

{id:48,text:"A developer stores a large list of product preferences in a Session Variable to avoid repeated server calls. What is the main concern with this approach in a multi-user application?",
options:["A. Session Variables cannot store Lists — only simple data types are supported.","B. Each active user session keeps its own copy of the data in server memory, causing high memory consumption at scale.","C. Session Variables expire after 20 minutes of inactivity, causing data loss.","D. Session Variables are shared across all users, creating data privacy issues."],correct:"B",
explanation:"Session Variables são guardadas em memória no servidor (uma cópia por sessão). Com milhares de utilizadores simultâneos, listas grandes em Session Variables consomem memória proporcional ao número de sessões ativas. A alternativa é calcular/buscar os dados quando necessário ou usar cache de Aggregate."},

{id:49,text:"In a BPT Process, which Activity type should be used to pause the process flow until an Entity record reaches a specific state (e.g., an Order is marked as Shipped)?",
options:["A. Human Activity, assigning it to a system user that updates the record.","B. Automatic Activity, polling the Entity every minute.","C. Wait Activity, configured with the Entity and the condition to watch.","D. Conditional Start, triggering a new process when the condition is met."],correct:"C",
explanation:"Wait Activity é exatamente para este cenário: suspende o processo até que um evento ocorra (ex: atributo de Entity mudar para um valor específico). É event-driven — a plataforma monitoriza a condição e retoma o processo automaticamente, sem polling manual."},

{id:50,text:"A developer notices that an Aggregate filtering on the 'Email' attribute of the User Entity is slow. The Entity has millions of records. What is the most effective solution?",
options:["A. Switch from an Aggregate to an Advanced SQL element for better query control.","B. Add a database index on the 'Email' attribute in the Entity definition.","C. Increase the Cache in Minutes of the Aggregate to reduce database calls.","D. Limit the MaxRecords property of the Aggregate to 1000 records."],correct:"B",
explanation:"Para queries lentas por filtro em atributos de alta cardinalidade, a solução correta é criar um índice na base de dados sobre esse atributo. O índice acelera as lookups independentemente de usar Aggregate ou Advanced SQL. Cache e MaxRecords não resolvem a causa raiz."},

{id:51,text:"A developer has a Block inside a Reactive Screen. The Block needs to notify the parent Screen that the user performed an action inside the Block. What is the correct OutSystems approach?",
options:["A. Use a Site Property to pass the event information from the Block to the Screen.","B. Define an Event on the Block and handle it with an Event Handler on the parent Screen.","C. Call a Client Action of the parent Screen directly from inside the Block using a reference.","D. Use a Session Variable to store the event data and check it in the Screen's OnRender handler."],correct:"B",
explanation:"A comunicação Block → Screen pai usa Events: define-se um Event no Block (com parâmetros se necessário) e usa-se o Notify built-in action para o disparar. O Screen pai define um Event Handler para reagir. Este é o padrão de componente reativo correto no OutSystems."},

{id:52,text:"A developer sets specific Roles on a Screen to restrict access. Which statement correctly describes the behavior?",
options:["A. Any logged-in user can access the Screen, regardless of their assigned Roles.","B. Only users with at least one of the Screen's required Roles are allowed access; others are redirected.","C. Roles on Screens are only enforced in Production environments, not in Development.","D. If the user lacks the required Role, a Database Exception is raised."],correct:"B",
explanation:"Screen Roles são verificados a cada acesso. Se o utilizador autenticado não tiver nenhum dos roles exigidos, é redirecionado para o ecrã de 'Not Authorized' (ou login se anónimo). A verificação é feita em todos os ambientes e é idêntica independentemente do ambiente."},

{id:53,text:"When should a developer use a Static Entity instead of a regular Entity in OutSystems?",
options:["A. When the data changes frequently and must be updated by end users at runtime.","B. When the data is fixed at design time (e.g., status codes, categories) and does not change during runtime.","C. When the Entity needs to be shared across multiple applications without a Service Module.","D. When the data volume is too large to be handled by a regular Entity efficiently."],correct:"B",
explanation:"Static Entities são para dados enumerados e fixos definidos em design time (ex: OrderStatus: Pending, Shipped, Delivered). São compilados na aplicação, tornando as queries extremamente rápidas. Para dados mutáveis em runtime, usa-se Entity normal."},

{id:54,text:"When does the OnRender event execute on a Reactive Screen or Block?",
options:["A. Only once, immediately after the Screen is first loaded and all data actions complete.","B. Every time the Screen or Block is rendered or re-rendered due to data changes.","C. Only when the user explicitly navigates to the Screen.","D. When the Screen is destroyed and removed from the DOM."],correct:"B",
explanation:"OnRender é chamado após cada render/re-render do ecrã ou Block — incluindo a carga inicial e qualquer re-render por mudança de variáveis. É útil para interações com bibliotecas JavaScript externas que precisam re-inicializar após mudanças no DOM. Usar com cuidado para evitar loops."},

{id:55,text:"A developer wants to notify multiple modules that an Order has been completed, without creating direct dependencies between the producer and the consumers. Which OutSystems feature enables this?",
options:["A. Site Properties shared across modules.","B. BPT Process with a Conditional Start listening for Entity changes.","C. Application Events (Event and Handler) to implement a publish-subscribe pattern.","D. A shared Session Variable updated by the producer and read by consumers."],correct:"C",
explanation:"Application Events (disponíveis em Service Modules) implementam o padrão pub/sub: o produtor publica um Event sem conhecer os consumidores; cada consumidor define um Handler independente. Elimina dependências diretas e permite adicionar novos consumidores sem alterar o produtor."}
];
