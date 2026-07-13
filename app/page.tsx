const readingPath = [
  {
    step: "01",
    title: "Macro",
    text: "Qué problema resuelve el modelo side-by-side y por qué IRIS / Health Connect queda al centro.",
  },
  {
    step: "02",
    title: "Capas",
    text: "Qué sistema domina cada dominio: clínico, interoperabilidad, SAP legado, SAP destino y gobierno.",
  },
  {
    step: "03",
    title: "Flujos",
    text: "Cómo viajan admisiones, órdenes, insumos, facturación y Business Partner entre los sistemas.",
  },
  {
    step: "04",
    title: "Micro",
    text: "Qué patrones técnicos se usan hoy y cómo bajar luego al inventario de RFC, BAPI, IDoc y web services.",
  },
];

const layers = [
  {
    id: "clinica",
    name: "Capa Clinica",
    owner: "TrakCare y sistemas clinicos conectados",
    body: "Episodios, agenda, ordenes, resultados, documentos clinicos y experiencia asistencial.",
    points: [
      "TrakCare mantiene la verdad clinica.",
      "LIS, RIS y terceros se integran sin forzar logica medica dentro de SAP.",
      "La operacion asistencial no depende de la transicion financiera.",
    ],
  },
  {
    id: "interoperabilidad",
    name: "Capa de Interoperabilidad",
    owner: "InterSystems IRIS / Health Connect",
    body: "Hub de integracion, transformacion, trazabilidad, reglas y observabilidad de extremo a extremo.",
    points: [
      "Conecta HL7, FHIR, XML, JSON, IDoc y RFC/BAPI via JCo.",
      "Centraliza mapeos, validaciones y correlacion de mensajes.",
      "Desacopla cambios de TrakCare, ECC y S/4HANA.",
    ],
  },
  {
    id: "ecc",
    name: "Capa SAP Legado",
    owner: "ECC + IS-H",
    body: "Mantiene la continuidad del modelo historico mientras se aislan los componentes que migran a S/4HANA.",
    points: [
      "IS-H sigue conectado al mundo clinico durante la transicion.",
      "SD queda como pieza puente para ciertos flujos de facturacion.",
      "La integracion side-by-side evita una conversion brownfield no soportada para IS-H.",
    ],
  },
  {
    id: "s4",
    name: "Capa SAP Destino",
    owner: "S/4HANA",
    body: "Recibe el nucleo administrativo y logistico: FI, CO, MM, SD, PM y Business Partner.",
    points: [
      "Consolida contabilidad, compras, inventarios y mantenimiento.",
      "Business Partner pasa a ser objeto maestro administrativo.",
      "Exige mayor consistencia en datos, unidades, impuestos y reversos.",
    ],
  },
  {
    id: "gobierno",
    name: "Capa de Gobierno",
    owner: "Operacion TI + equipos funcionales",
    body: "Sincronizacion de customizing, datos maestros, monitoreo, cutover y control de errores.",
    points: [
      "Double maintenance mientras conviven ECC y S/4HANA.",
      "Alineacion de company codes, materiales, cuentas, centros de costo y tipos documentales.",
      "Reglas de reintento, conciliacion y soporte operacional.",
    ],
  },
];

const flows = [
  {
    title: "Admision y episodio",
    source: "TrakCare",
    route: "Health Connect normaliza y entrega a ECC / IS-H los datos que aun soportan procesos legacy.",
    target: "ECC + IS-H / S/4HANA segun el hito de migracion",
  },
  {
    title: "Ordenes clinicas e insumos",
    source: "TrakCare / terceros clinicos",
    route: "IRIS orquesta ordenes, consumo y eventos logistico-clinicos; SAP recibe solo lo que necesita para control y valorizacion.",
    target: "S/4HANA MM / SD / CO",
  },
  {
    title: "Facturacion y cargo financiero",
    source: "IS-H / SD",
    route: "El escenario side-by-side oficial empuja la interfaz financiera hacia S/4HANA con ACC_DOCUMENT e integracion asociada.",
    target: "S/4HANA FI",
  },
  {
    title: "Terceros pagadores y BP",
    source: "SAP / integraciones maestras",
    route: "Los pagadores y contrapartes deben alinearse con Business Partner y sus confirmaciones de replicacion.",
    target: "S/4HANA Business Partner",
  },
];

const patterns = [
  {
    title: "HL7 / FHIR / APIs",
    text: "Patron natural del dominio clinico. IRIS absorbe la semantica clinica y evita exponer SAP a mensajes asistenciales crudos.",
  },
  {
    title: "IDoc",
    text: "Util para maestros y procesos SAP clasicos. En la propuesta HGPS aparecen materiales, compras, precios y otros objetos replicados por esta via.",
  },
  {
    title: "RFC / BAPI via JCo",
    text: "Canal nativo para llamadas SAP desde Health Connect cuando se requiere comportamiento funcional controlado y sincronico.",
  },
  {
    title: "Web Services",
    text: "Especialmente relevantes para escenarios de Business Partner y confirmaciones de replicacion entre ECC y S/4HANA.",
  },
  {
    title: "Eventos y monitoreo",
    text: "IRIS concentra auditoria, correlacion y alertas para que la operacion no dependa de revisar cada sistema por separado.",
  },
];

const sapDomains = [
  {
    module: "FI / CO",
    ownership: "S/4HANA",
    detail: "Cuentas por pagar, cuentas por cobrar, bancos, costeo, rentabilidad y cierres.",
  },
  {
    module: "MM / inventarios",
    ownership: "S/4HANA",
    detail: "Compras, materiales, stock, almacenes y soporte a consumos clinicos valorizados.",
  },
  {
    module: "SD",
    ownership: "ECC durante transicion; S/4HANA como destino funcional",
    detail: "Facturacion y piezas puente del modelo side-by-side IS-H.",
  },
  {
    module: "IS-H",
    ownership: "ECC",
    detail: "Permanece como legado operativo mientras el backoffice se desacopla hacia S/4HANA.",
  },
  {
    module: "Business Partner",
    ownership: "S/4HANA",
    detail: "Objeto administrativo objetivo para clientes, pagadores y terceros relacionados.",
  },
];

const catalog = [
  {
    family: "Business Partner",
    interfaces: [
      "CO_MDG_BP_RPLCTRQ",
      "CO_MDG_BP_RPLCTCO",
      "BUSINESSPARTNERSUITEBULKREPLIC",
      "BUSINESSPARTNERSUITEBULKREPLI1",
    ],
    status: "Confirmado en deck HGPS / S4",
    note: "Replicacion y confirmacion de creacion de BP entre ecosistemas SAP.",
  },
  {
    family: "RFCs custom financieros",
    interfaces: [
      "ZSISS_FIFM_LOCAL_SFI001",
      "ZSISS_FIFM_LOCAL_SFI003",
      "ZSISS_FIFM_LOCAL_SFI004",
      "ZSISS_FIFM_LOCAL_SFI005",
      "ZSISS_FIFM_LOCAL_SFI006",
      "ZSISS_FIFM_LOCAL_SFI008",
      "ZSISS_FIFM_LOCAL_SFI009",
      "ZSISS_FIFM_LOCAL_SFI010",
      "ZSISS_FIFM_LOCAL_SFI011",
    ],
    status: "Confirmado en deck HGPS / RFC",
    note: "Funciones locales que deben documentarse una a una antes del paso a catalogo tecnico detallado.",
  },
  {
    family: "RFCs custom complementarios",
    interfaces: [
      "ZSISS_FIFM_LOCAL_C30_01",
      "ZSISS_FIFM_LOCAL_C30_02",
      "ZSISS_FIFM_LOCAL_C30_03",
      "ZSISS_FIFM_LOCAL_C30_04",
    ],
    status: "Confirmado en deck HGPS / RFC",
    note: "Segmento adicional a clasificar por proceso de negocio, payload y dependencia funcional.",
  },
  {
    family: "IDocs y maestros",
    interfaces: [
      "BATMAS",
      "INFREC",
      "MATMAS",
      "ORDERS",
      "PORDCR1",
      "PRCMAS",
      "GLMAST",
      "EXCHANGE_RATE",
    ],
    status: "Confirmado en deck HGPS / IDoc",
    note: "Objetos maestros y transaccionales que conviene mapear junto con su distribucion BD64, puertos y partner profiles.",
  },
];

const evidence = [
  {
    title: "Guia oficial SAP",
    body: "La guia 2026 de integracion IS-H con S/4HANA describe el escenario side-by-side, el uso de ACC_DOCUMENT, la sincronizacion de customizing y los impactos de migracion.",
  },
  {
    title: "Propuesta HGPS",
    body: "El deck de MyAllSupport ya identifica los patrones tecnicos reales vistos en el proyecto: IDoc, web services, RFC y Business Partner.",
  },
  {
    title: "Condicion arquitectonica actual",
    body: "La integracion deja de depender de BTP y se recentra en IRIS / Health Connect como capa de interoperabilidad y orquestacion.",
  },
];

export default function Home() {
  return (
    <main className="site-shell">
      <header className="site-header">
        <div className="shell nav-bar">
          <a className="brand" href="#inicio">
            <span className="brand-mark">M</span>
            <span className="brand-copy">
              <strong>Side by Side Health</strong>
              <small>Arquitectura explicada capa por capa</small>
            </span>
          </a>

          <nav className="top-nav" aria-label="Secciones principales">
            <a href="#macro">Arquitectura</a>
            <a href="#capas">Capas</a>
            <a href="#flujos">Flujos</a>
            <a href="#integraciones">Integraciones</a>
            <a href="#rfc-bapi">SAP RFC/BAPI</a>
          </nav>
        </div>
      </header>

      <section className="hero-section" id="inicio">
        <div className="shell hero-grid">
          <div className="hero-copy panel panel-hero">
            <p className="eyebrow">Prestadores de salud | ECC + IS-H | S/4HANA | TrakCare | IRIS</p>
            <h1>
              Arquitectura side-by-side para salud, desde la vista macro hasta el
              catalogo RFC / BAPI.
            </h1>
            <p className="lead">
              Este sitio explica el modelo objetivo cuando un prestador opera con
              SAP IS-H sobre ECC, conecta su mundo clinico con TrakCare y usa
              InterSystems IRIS / Health Connect como hub de integracion hacia
              S/4HANA.
            </p>

            <div className="hero-actions">
              <a className="btn btn-primary" href="#macro">
                Empezar por la arquitectura
              </a>
              <a className="btn btn-secondary" href="#rfc-bapi">
                Ir al nivel SAP
              </a>
            </div>

            <dl className="stats-grid" aria-label="Resumen del sitio">
              <div className="stat-card">
                <dt>4</dt>
                <dd>dominios principales</dd>
              </div>
              <div className="stat-card">
                <dt>5</dt>
                <dd>capas explicadas</dd>
              </div>
              <div className="stat-card">
                <dt>5</dt>
                <dd>patrones de integracion</dd>
              </div>
              <div className="stat-card">
                <dt>2</dt>
                <dd>fuentes base del proyecto</dd>
              </div>
            </dl>
          </div>

          <div className="hero-aside panel panel-visual">
            <p className="panel-tag">Lectura recomendada</p>
            <h2>De lo macro a lo micro</h2>
            <div className="step-grid">
              {readingPath.map((item) => (
                <article className="step-card" key={item.step}>
                  <span className="step-number">{item.step}</span>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section-shell" id="macro">
        <div className="shell">
          <div className="section-intro">
            <p className="eyebrow">Arquitectura general</p>
            <h2>El principio rector: lo clinico queda fuera de SAP y la interoperabilidad queda en IRIS.</h2>
            <p>
              La arquitectura no busca reemplazar el HIS ni replicar logica
              clinica dentro de S/4HANA. Busca desacoplar el mundo asistencial
              del backoffice SAP, mantener continuidad en ECC + IS-H y mover el
              nucleo financiero-logistico a S/4HANA.
            </p>
          </div>

          <div className="architecture-diagram panel" aria-label="Diagrama de arquitectura side-by-side">
            <div className="diagram-column">
              <article className="diagram-group">
                <span className="diagram-title">Dominio clinico</span>
                <div className="diagram-stack">
                  <div className="diagram-node">TrakCare</div>
                  <div className="diagram-node">LIS / RIS / Vademecum / otros terceros</div>
                </div>
              </article>
            </div>

            <div className="diagram-link-column" aria-hidden="true">
              <span className="diagram-link">Integracion clinica</span>
              <span className="diagram-arrow">↔</span>
            </div>

            <div className="diagram-column diagram-center">
              <article className="diagram-group diagram-group-featured">
                <span className="diagram-title">Capa de interoperabilidad</span>
                <div className="diagram-stack">
                  <div className="diagram-node diagram-node-primary">
                    InterSystems Health Connect
                    <small>+ IRIS for Health</small>
                  </div>
                  <div className="diagram-node">Identidad paciente / MPI</div>
                  <div className="diagram-node">Transformacion HL7 v2 / FHIR / XML / JSON</div>
                  <div className="diagram-node">Orquestacion / reglas / auditoria</div>
                </div>
              </article>
            </div>

            <div className="diagram-link-column" aria-hidden="true">
              <span className="diagram-link">RFC / BAPI / IDoc via JCo</span>
              <span className="diagram-arrow">↔</span>
            </div>

            <div className="diagram-column">
              <article className="diagram-group">
                <span className="diagram-title">SAP legado / transicion</span>
                <div className="diagram-stack">
                  <div className="diagram-node">ECC + IS-H</div>
                </div>
              </article>

              <div className="diagram-inline-link" aria-hidden="true">
                <span>IDoc / RFC de negocio</span>
                <span className="diagram-arrow">↔</span>
              </div>

              <article className="diagram-group">
                <span className="diagram-title">SAP destino</span>
                <div className="diagram-stack">
                  <div className="diagram-node">
                    S/4HANA
                    <small>FI / CO / MM / SD / BP</small>
                  </div>
                </div>
              </article>
            </div>
          </div>

          <div className="macro-layout">
            <article className="macro-column panel">
              <span className="macro-label">Dominio clinico</span>
              <h3>TrakCare y terceros</h3>
              <ul className="bullet-list">
                <li>Agenda, episodio, ordenes, resultados y documentos clinicos.</li>
                <li>LIS, RIS, vademecum y otros sistemas satelite.</li>
                <li>Fuente primaria de eventos asistenciales.</li>
              </ul>
            </article>

            <article className="macro-column macro-hub panel">
              <span className="macro-label">Capa central</span>
              <h3>InterSystems IRIS / Health Connect</h3>
              <ul className="bullet-list">
                <li>Orquesta mensajes, APIs, transformaciones y auditoria.</li>
                <li>Expone conectividad SAP nativa via JCo para RFC / BAPI.</li>
                <li>Desacopla cambios entre TrakCare, ECC y S/4HANA.</li>
              </ul>
            </article>

            <article className="macro-column panel">
              <span className="macro-label">Dominios SAP</span>
              <h3>ECC + IS-H y S/4HANA</h3>
              <ul className="bullet-list">
                <li>ECC mantiene legado clinico-administrativo durante la transicion.</li>
                <li>S/4HANA recibe FI, CO, MM, SD, PM y Business Partner.</li>
                <li>La integracion side-by-side oficial gestiona la interfaz financiera.</li>
              </ul>
            </article>
          </div>

          <div className="evidence-row">
            {evidence.map((item) => (
              <article className="evidence-card panel" key={item.title}>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-shell section-alt" id="capas">
        <div className="shell">
          <div className="section-intro">
            <p className="eyebrow">Capas</p>
            <h2>Responsabilidad clara por capa para evitar solapamientos y deudas futuras.</h2>
            <p>
              Cada capa tiene un sistema dominante, un tipo de dato principal y
              una razon de existir. Eso ordena decisiones de integracion, soporte
              y evolucion.
            </p>
          </div>

          <div className="layer-grid">
            {layers.map((layer) => (
              <article className="layer-card panel" key={layer.id}>
                <p className="layer-owner">{layer.owner}</p>
                <h3>{layer.name}</h3>
                <p>{layer.body}</p>
                <ul className="bullet-list">
                  {layer.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-shell" id="flujos">
        <div className="shell">
          <div className="section-intro">
            <p className="eyebrow">Flujos de negocio</p>
            <h2>La explicacion baja desde procesos concretos, no solo desde tecnologia.</h2>
            <p>
              Esta es la ruta correcta para leer la arquitectura: primero el
              proceso, luego la capa, luego el contrato tecnico.
            </p>
          </div>

          <div className="flow-list">
            {flows.map((flow) => (
              <article className="flow-card panel" key={flow.title}>
                <h3>{flow.title}</h3>
                <div className="flow-meta">
                  <div>
                    <span>Origen</span>
                    <strong>{flow.source}</strong>
                  </div>
                  <div>
                    <span>Destino</span>
                    <strong>{flow.target}</strong>
                  </div>
                </div>
                <p>{flow.route}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-shell section-alt" id="integraciones">
        <div className="shell">
          <div className="section-intro">
            <p className="eyebrow">Patrones de integracion</p>
            <h2>Los contratos tecnicos se explican por patron antes que por transaccion puntual.</h2>
            <p>
              Eso permite entender el paisaje completo antes de entrar al catalogo
              de funciones SAP.
            </p>
          </div>

          <div className="pattern-grid">
            {patterns.map((pattern) => (
              <article className="pattern-card panel" key={pattern.title}>
                <h3>{pattern.title}</h3>
                <p>{pattern.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-shell" id="sap-mapa">
        <div className="shell">
          <div className="section-intro">
            <p className="eyebrow">Mapa SAP</p>
            <h2>Qué queda en ECC y qué debe consolidarse en S/4HANA.</h2>
            <p>
              El sitio necesita esta vista porque el detalle RFC / BAPI no tiene
              contexto si no se entiende primero el ownership funcional.
            </p>
          </div>

          <div className="sap-grid">
            {sapDomains.map((domain) => (
              <article className="sap-card panel" key={domain.module}>
                <span className="sap-module">{domain.module}</span>
                <h3>{domain.ownership}</h3>
                <p>{domain.detail}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-shell section-alt" id="rfc-bapi">
        <div className="shell">
          <div className="section-intro">
            <p className="eyebrow">SAP RFC / BAPI</p>
            <h2>Primer catalogo de interfaces para bajar de arquitectura a inventario tecnico.</h2>
            <p>
              Esta seccion no intenta cerrar aun el detalle de payload, errores o
              autenticacion. Ordena primero las familias de integracion ya
              visibles en la guia SAP y en la propuesta HGPS.
            </p>
          </div>

          <div className="catalog-list">
            {catalog.map((entry) => (
              <article className="catalog-card panel" key={entry.family}>
                <div className="catalog-head">
                  <div>
                    <p className="catalog-family">{entry.family}</p>
                    <h3>{entry.status}</h3>
                  </div>
                  <span className="catalog-badge">Base actual</span>
                </div>
                <p>{entry.note}</p>
                <ul className="code-list">
                  {entry.interfaces.map((name) => (
                    <li key={name}>
                      <code>{name}</code>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>

          <div className="next-step panel">
            <p className="eyebrow">Siguiente nivel</p>
            <h3>Cómo continuar hasta el detalle funcional de cada RFC / BAPI</h3>
            <ol className="number-list">
              <li>Clasificar cada interfaz por proceso, origen, destino y criticidad.</li>
              <li>Mapear transaccion SAP asociada: SM59, WE20, BD64, SOAMANAGER, SE37 o clase wrapper.</li>
              <li>Documentar payload logico, reglas de validacion, manejo de errores y dependencia de customizing.</li>
              <li>Relacionar cada interfaz con su capa y flujo de negocio en este mismo sitio.</li>
            </ol>
          </div>
        </div>
      </section>

      <section className="section-shell" id="anexos">
        <div className="shell">
          <div className="closing panel">
            <div>
              <p className="eyebrow">Fuentes y anexos</p>
              <h2>Base documental del sitio</h2>
              <p>
                El recorrido se apoya en la guia oficial de integracion IS-H con
                S/4HANA y en la propuesta arquitectonica preparada para HGPS por
                MyAllSupport. La siguiente iteracion natural es convertir el
                catalogo base en una matriz navegable de interfaces.
              </p>
            </div>
            <div className="source-list">
              <a className="source-link" href="https://myallsupport.cl/" target="_blank" rel="noreferrer">
                Referencia visual: myAllSupport.cl
              </a>
              <div className="source-link">
                Guia oficial SAP: Configuration Guide IS-H - SAP S4HANA Integration.pdf
              </div>
              <div className="source-link">
                Propuesta HGPS: Arquitectura_Proyecto_Side_by_Side_SIcard_VF1.pptx
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
