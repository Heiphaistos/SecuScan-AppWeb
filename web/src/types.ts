export type Severity = "info" | "low" | "medium" | "high" | "critical";

export interface Vulnerability {
  id: string;
  file_path: string;
  line_number: number | null;
  column: number | null;
  severity: Severity;
  category: string;
  title: string;
  description: string;
  code_snippet: string | null;
  matched_pattern: string | null;
  remediation: string;
  cwe_id: string | null;
  fp_hint: string | null;
}

export interface ScanStats {
  critical: number;
  high: number;
  medium: number;
  low: number;
  info: number;
}

export interface ScanResult {
  scan_id: string;
  target_path: string;
  started_at: string;
  completed_at: string | null;
  total_files: number;
  scanned_files: number;
  vulnerabilities: Vulnerability[];
  errors: { file_path: string; error: string }[];
  stats: ScanStats;
}

export const SEVERITY_ORDER: Severity[] = ["critical", "high", "medium", "low", "info"];

export const SEVERITY_LABEL: Record<Severity, string> = {
  critical: "CRITIQUE",
  high: "ÉLEVÉ",
  medium: "MOYEN",
  low: "FAIBLE",
  info: "INFO",
};

export const SEVERITY_COLOR: Record<Severity, string> = {
  critical: "#ef4444",
  high: "#f97316",
  medium: "#eab308",
  low: "#3b82f6",
  info: "#64748b",
};

const CATEGORY_FR: Record<string, string> = {
  sql_injection: "Injection SQL",
  xss: "XSS",
  insecure_deserialization: "Désérialisation non sûre",
  weak_crypto: "Cryptographie faible",
  cors_misconfiguration: "CORS mal configuré",
  hardcoded_secret: "Secret en dur",
  open_redirect: "Redirection ouverte",
  path_traversal: "Path traversal",
  command_injection: "Injection de commande",
  privilege_escalation: "Élévation de privilèges",
  obfuscated_command: "Commande obfusquée",
  antivirus_disabled: "Antivirus désactivé",
  payload_download: "Téléchargement de payload",
  arbitrary_code_execution: "Exécution de code arbitraire",
  api_key_leak: "Fuite de clé API",
  password_leak: "Fuite de mot de passe",
  jwt_exposed: "JWT exposé",
  connection_string_leak: "Chaîne de connexion exposée",
  high_entropy_string: "Chaîne à haute entropie",
  missing_aslr: "ASLR manquant",
  missing_dep: "DEP manquant",
  invalid_signature: "Signature invalide",
  malware_indicator: "Indicateur de malware",
  dll_injection: "Injection DLL",
  suspicious_persistence: "Persistance suspecte",
  ransomware_indicator: "Indicateur de ransomware",
  sensitive_data_exposure: "Exposition de données sensibles",
  insecure_configuration: "Configuration non sûre",
};

export function categoryLabel(cat: string): string {
  return CATEGORY_FR[cat] ?? cat;
}
