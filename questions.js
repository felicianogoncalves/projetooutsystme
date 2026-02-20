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
explanation:"Mover BinaryData para entidade de extensão reduz tamanho dos registos. Queries com filtro por Description ficam mais rápidas."}
];
