export type AddendumDirection = "OffRamp" | "OnRamp";
export type AddendumType = "Bank" | "Momo" | "Cash" | "QR" | "Wallet";

export interface AddendumEntry {
  country: string;
  direction: AddendumDirection;
  type: AddendumType;
  provider: string;
}

/** Grouped row shown in the proposal table */
export interface AddendumRow {
  country: string;
  direction: AddendumDirection;
  type: AddendumType;
  providers: string[];
}

export const ADDENDUM_ENTRIES: AddendumEntry[] = [
  // ── Angola ──
  { country: "Angola", direction: "OffRamp", type: "Momo", provider: "Afrimoney" },
  // ── Bangladesh ──
  { country: "Bangladesh", direction: "OffRamp", type: "Bank", provider: "Dutch Bangla Bank" },
  { country: "Bangladesh", direction: "OffRamp", type: "Bank", provider: "Mutual Trust Bank" },
  { country: "Bangladesh", direction: "OffRamp", type: "Cash", provider: "Mutual Trust Bank" },
  { country: "Bangladesh", direction: "OffRamp", type: "Cash", provider: "NEC Money" },
  { country: "Bangladesh", direction: "OffRamp", type: "Momo", provider: "Bkash" },
  { country: "Bangladesh", direction: "OffRamp", type: "Momo", provider: "Nagad" },
  // ── Benin ──
  { country: "Benin", direction: "OffRamp", type: "Bank", provider: "Ecobank" },
  { country: "Benin", direction: "OffRamp", type: "Momo", provider: "Moov" },
  { country: "Benin", direction: "OffRamp", type: "Momo", provider: "MTN Money" },
  { country: "Benin", direction: "OffRamp", type: "Momo", provider: "Orange" },
  { country: "Benin", direction: "OnRamp", type: "Momo", provider: "Moov" },
  { country: "Benin", direction: "OnRamp", type: "Momo", provider: "MTN" },
  { country: "Benin", direction: "OnRamp", type: "Momo", provider: "Orange" },
  // ── Botswana ──
  { country: "Botswana", direction: "OffRamp", type: "Momo", provider: "Mascom" },
  { country: "Botswana", direction: "OffRamp", type: "Momo", provider: "Orange Money" },
  // ── Brazil ──
  { country: "Brazil", direction: "OffRamp", type: "Bank", provider: "Banco ITAU" },
  { country: "Brazil", direction: "OffRamp", type: "Bank", provider: "Banco Original" },
  // ── Burkina Faso ──
  { country: "Burkina Faso", direction: "OffRamp", type: "Bank", provider: "Ecobank" },
  { country: "Burkina Faso", direction: "OffRamp", type: "Momo", provider: "Moov Money" },
  { country: "Burkina Faso", direction: "OffRamp", type: "Momo", provider: "Orange Money" },
  { country: "Burkina Faso", direction: "OnRamp", type: "Momo", provider: "Moov" },
  { country: "Burkina Faso", direction: "OnRamp", type: "Momo", provider: "Orange" },
  // ── Burundi ──
  { country: "Burundi", direction: "OffRamp", type: "Bank", provider: "Ecobank" },
  { country: "Burundi", direction: "OffRamp", type: "Momo", provider: "BancoBu" },
  { country: "Burundi", direction: "OffRamp", type: "Momo", provider: "Ecocash" },
  // ── Cambodia ──
  { country: "Cambodia", direction: "OffRamp", type: "Cash", provider: "AMK Microfinance and Agents" },
  { country: "Cambodia", direction: "OffRamp", type: "Cash", provider: "Wing Network" },
  { country: "Cambodia", direction: "OffRamp", type: "Momo", provider: "Wing" },
  // ── Cameroon ──
  { country: "Cameroon", direction: "OffRamp", type: "Bank", provider: "Ecobank" },
  { country: "Cameroon", direction: "OffRamp", type: "Momo", provider: "MTN" },
  { country: "Cameroon", direction: "OffRamp", type: "Momo", provider: "Orange" },
  { country: "Cameroon", direction: "OnRamp", type: "Momo", provider: "MTN" },
  { country: "Cameroon", direction: "OnRamp", type: "Momo", provider: "Orange" },
  // ── Central African Republic ──
  { country: "Central African Republic", direction: "OffRamp", type: "Momo", provider: "Orange" },
  // ── Chad ──
  { country: "Chad", direction: "OffRamp", type: "Momo", provider: "Airtel" },
  { country: "Chad", direction: "OffRamp", type: "Momo", provider: "Moov" },
  // ── China ──
  { country: "China", direction: "OffRamp", type: "Momo", provider: "AliPay" },
  { country: "China", direction: "OffRamp", type: "Momo", provider: "WechatPay" },
  // ── Colombia ──
  { country: "Colombia", direction: "OffRamp", type: "Momo", provider: "Daviplata" },
  { country: "Colombia", direction: "OffRamp", type: "Momo", provider: "Movii" },
  { country: "Colombia", direction: "OffRamp", type: "Momo", provider: "Nequi" },
  // ── Comoros ──
  { country: "Comoros", direction: "OffRamp", type: "Momo", provider: "Mvola" },
  // ── DRC ──
  { country: "DR Congo", direction: "OffRamp", type: "Bank", provider: "Ecobank" },
  { country: "DR Congo", direction: "OffRamp", type: "Momo", provider: "Airtel" },
  { country: "DR Congo", direction: "OffRamp", type: "Momo", provider: "MPesa" },
  { country: "DR Congo", direction: "OffRamp", type: "Momo", provider: "Orange" },
  { country: "DR Congo", direction: "OffRamp", type: "Momo", provider: "Vodacom" },
  { country: "DR Congo", direction: "OnRamp", type: "Momo", provider: "Airtel" },
  { country: "DR Congo", direction: "OnRamp", type: "Momo", provider: "Orange" },
  { country: "DR Congo", direction: "OnRamp", type: "Momo", provider: "Vodacom" },
  // ── Egypt ──
  { country: "Egypt", direction: "OffRamp", type: "Cash", provider: "Banque du Caire" },
  { country: "Egypt", direction: "OffRamp", type: "Cash", provider: "Fawry Plus" },
  { country: "Egypt", direction: "OffRamp", type: "Momo", provider: "Fawry" },
  // ── El Salvador ──
  { country: "El Salvador", direction: "OffRamp", type: "Momo", provider: "Tigo Money" },
  // ── Eswatini ──
  { country: "Eswatini", direction: "OffRamp", type: "Momo", provider: "MTN" },
  // ── Ethiopia ──
  { country: "Ethiopia", direction: "OffRamp", type: "Bank", provider: "Addis International Bank" },
  { country: "Ethiopia", direction: "OffRamp", type: "Bank", provider: "Ahadu Bank" },
  { country: "Ethiopia", direction: "OffRamp", type: "Bank", provider: "Amhara Bank" },
  { country: "Ethiopia", direction: "OffRamp", type: "Bank", provider: "Awash International Bank" },
  { country: "Ethiopia", direction: "OffRamp", type: "Bank", provider: "Bank of Abyssinia" },
  { country: "Ethiopia", direction: "OffRamp", type: "Bank", provider: "Berhan International Bank" },
  { country: "Ethiopia", direction: "OffRamp", type: "Bank", provider: "Bunna Bank" },
  { country: "Ethiopia", direction: "OffRamp", type: "Bank", provider: "Commercial Bank of Ethiopia" },
  { country: "Ethiopia", direction: "OffRamp", type: "Bank", provider: "Cooperative Bank of Oromia" },
  { country: "Ethiopia", direction: "OffRamp", type: "Bank", provider: "Dashen Bank" },
  { country: "Ethiopia", direction: "OffRamp", type: "Bank", provider: "Debub Global Bank" },
  { country: "Ethiopia", direction: "OffRamp", type: "Bank", provider: "Enat Bank" },
  { country: "Ethiopia", direction: "OffRamp", type: "Bank", provider: "Gadaa Bank" },
  { country: "Ethiopia", direction: "OffRamp", type: "Bank", provider: "Goh Betoch Bank" },
  { country: "Ethiopia", direction: "OffRamp", type: "Bank", provider: "Hibret Bank" },
  { country: "Ethiopia", direction: "OffRamp", type: "Bank", provider: "Hijra Bank" },
  { country: "Ethiopia", direction: "OffRamp", type: "Bank", provider: "Kacha" },
  { country: "Ethiopia", direction: "OffRamp", type: "Bank", provider: "Lion International Bank" },
  { country: "Ethiopia", direction: "OffRamp", type: "Bank", provider: "Nib International Bank" },
  { country: "Ethiopia", direction: "OffRamp", type: "Bank", provider: "Oromia Bank" },
  { country: "Ethiopia", direction: "OffRamp", type: "Bank", provider: "Shebelle Bank" },
  { country: "Ethiopia", direction: "OffRamp", type: "Bank", provider: "Sidama Bank" },
  { country: "Ethiopia", direction: "OffRamp", type: "Bank", provider: "Sinqee Bank" },
  { country: "Ethiopia", direction: "OffRamp", type: "Bank", provider: "Tseday Bank" },
  { country: "Ethiopia", direction: "OffRamp", type: "Bank", provider: "Tsehay Bank" },
  { country: "Ethiopia", direction: "OffRamp", type: "Bank", provider: "Wegagen Bank" },
  { country: "Ethiopia", direction: "OffRamp", type: "Bank", provider: "ZamZam Bank" },
  { country: "Ethiopia", direction: "OffRamp", type: "Bank", provider: "Zemen Bank" },
  { country: "Ethiopia", direction: "OffRamp", type: "Cash", provider: "Lion International Bank" },
  { country: "Ethiopia", direction: "OffRamp", type: "Momo", provider: "Amole" },
  { country: "Ethiopia", direction: "OffRamp", type: "Momo", provider: "CBE Birr" },
  { country: "Ethiopia", direction: "OffRamp", type: "Momo", provider: "Ethio Telcom" },
  { country: "Ethiopia", direction: "OffRamp", type: "Momo", provider: "HelloCash" },
  { country: "Ethiopia", direction: "OffRamp", type: "Momo", provider: "Kacha" },
  { country: "Ethiopia", direction: "OffRamp", type: "Momo", provider: "MPesa" },
  { country: "Ethiopia", direction: "OffRamp", type: "Momo", provider: "Safaricom" },
  { country: "Ethiopia", direction: "OffRamp", type: "Momo", provider: "TeleBirr" },
  // ── Fiji ──
  { country: "Fiji", direction: "OffRamp", type: "Momo", provider: "MPaisa" },
  // ── Gabon ──
  { country: "Gabon", direction: "OffRamp", type: "Momo", provider: "Airtel" },
  { country: "Gabon", direction: "OffRamp", type: "Momo", provider: "Moov" },
  // ── Gambia ──
  { country: "Gambia", direction: "OffRamp", type: "Bank", provider: "Ecobank" },
  { country: "Gambia", direction: "OffRamp", type: "Momo", provider: "Africell" },
  { country: "Gambia", direction: "OffRamp", type: "Momo", provider: "Afrimoney" },
  // ── Ghana ──
  { country: "Ghana", direction: "OffRamp", type: "Bank", provider: "ABSA Bank" },
  { country: "Ghana", direction: "OffRamp", type: "Bank", provider: "Access Bank" },
  { country: "Ghana", direction: "OffRamp", type: "Bank", provider: "Adom Savings & Loans" },
  { country: "Ghana", direction: "OffRamp", type: "Bank", provider: "Agricultural Development Bank" },
  { country: "Ghana", direction: "OffRamp", type: "Bank", provider: "ARB Apex Bank" },
  { country: "Ghana", direction: "OffRamp", type: "Bank", provider: "Bank of Africa" },
  { country: "Ghana", direction: "OffRamp", type: "Bank", provider: "Bank of Baroda" },
  { country: "Ghana", direction: "OffRamp", type: "Bank", provider: "BSIC Bank" },
  { country: "Ghana", direction: "OffRamp", type: "Bank", provider: "CAL Bank" },
  { country: "Ghana", direction: "OffRamp", type: "Bank", provider: "Consolidated Bank" },
  { country: "Ghana", direction: "OffRamp", type: "Bank", provider: "Ecobank" },
  { country: "Ghana", direction: "OffRamp", type: "Bank", provider: "Energy Bank" },
  { country: "Ghana", direction: "OffRamp", type: "Bank", provider: "FBN Bank" },
  { country: "Ghana", direction: "OffRamp", type: "Bank", provider: "Fidelity Bank" },
  { country: "Ghana", direction: "OffRamp", type: "Bank", provider: "First Allied Savings & Loans" },
  { country: "Ghana", direction: "OffRamp", type: "Bank", provider: "First Atlantic Bank" },
  { country: "Ghana", direction: "OffRamp", type: "Bank", provider: "First National Bank" },
  { country: "Ghana", direction: "OffRamp", type: "Bank", provider: "GCB Bank" },
  { country: "Ghana", direction: "OffRamp", type: "Bank", provider: "GHL Bank" },
  { country: "Ghana", direction: "OffRamp", type: "Bank", provider: "Guarantee Trust Bank" },
  { country: "Ghana", direction: "OffRamp", type: "Bank", provider: "Heritage Bank" },
  { country: "Ghana", direction: "OffRamp", type: "Bank", provider: "HFC Bank" },
  { country: "Ghana", direction: "OffRamp", type: "Bank", provider: "National Investment Bank" },
  { country: "Ghana", direction: "OffRamp", type: "Bank", provider: "Opportunity International" },
  { country: "Ghana", direction: "OffRamp", type: "Bank", provider: "Premium Bank" },
  { country: "Ghana", direction: "OffRamp", type: "Bank", provider: "Prudential Bank" },
  { country: "Ghana", direction: "OffRamp", type: "Bank", provider: "Republic Bank" },
  { country: "Ghana", direction: "OffRamp", type: "Bank", provider: "Royal Bank" },
  { country: "Ghana", direction: "OffRamp", type: "Bank", provider: "Societe Generale" },
  { country: "Ghana", direction: "OffRamp", type: "Bank", provider: "Stanbic Bank" },
  { country: "Ghana", direction: "OffRamp", type: "Bank", provider: "Standard Chartered Bank" },
  { country: "Ghana", direction: "OffRamp", type: "Bank", provider: "UniBank" },
  { country: "Ghana", direction: "OffRamp", type: "Bank", provider: "United Bank for Africa" },
  { country: "Ghana", direction: "OffRamp", type: "Bank", provider: "Universal Merchant Bank" },
  { country: "Ghana", direction: "OffRamp", type: "Bank", provider: "Zenith Bank" },
  { country: "Ghana", direction: "OffRamp", type: "Cash", provider: "Zeepay" },
  { country: "Ghana", direction: "OffRamp", type: "Momo", provider: "Airtel Money" },
  { country: "Ghana", direction: "OffRamp", type: "Momo", provider: "Airtel Tigo" },
  { country: "Ghana", direction: "OffRamp", type: "Momo", provider: "MTN" },
  { country: "Ghana", direction: "OffRamp", type: "Momo", provider: "Tigo" },
  { country: "Ghana", direction: "OffRamp", type: "Momo", provider: "Vodafone Money" },
  { country: "Ghana", direction: "OnRamp", type: "Momo", provider: "Airtel" },
  { country: "Ghana", direction: "OnRamp", type: "Momo", provider: "MTN" },
  { country: "Ghana", direction: "OnRamp", type: "Momo", provider: "Tigo" },
  { country: "Ghana", direction: "OnRamp", type: "Momo", provider: "Vodafone" },
  // ── Guinea ──
  { country: "Guinea", direction: "OffRamp", type: "Bank", provider: "Ecobank" },
  { country: "Guinea", direction: "OffRamp", type: "Momo", provider: "MTN Guinea Conakry" },
  { country: "Guinea", direction: "OffRamp", type: "Momo", provider: "Orange Money" },
  { country: "Guinea", direction: "OnRamp", type: "Momo", provider: "MTN Guinea Conakry" },
  { country: "Guinea", direction: "OnRamp", type: "Momo", provider: "Orange Guinea Conakry" },
  // ── Guinea-Bissau ──
  { country: "Guinea-Bissau", direction: "OffRamp", type: "Momo", provider: "MTN" },
  // ── India ──
  { country: "India", direction: "OffRamp", type: "Bank", provider: "All Banks" },
  // ── Indonesia ──
  { country: "Indonesia", direction: "OffRamp", type: "Momo", provider: "AstraPay" },
  { country: "Indonesia", direction: "OffRamp", type: "Momo", provider: "Dana" },
  { country: "Indonesia", direction: "OffRamp", type: "Momo", provider: "GoPay" },
  { country: "Indonesia", direction: "OffRamp", type: "Momo", provider: "IMKas" },
  { country: "Indonesia", direction: "OffRamp", type: "Momo", provider: "LinkAja" },
  { country: "Indonesia", direction: "OffRamp", type: "Momo", provider: "Ovo" },
  { country: "Indonesia", direction: "OffRamp", type: "Momo", provider: "ShopeePay" },
  // ── Ivory Coast ──
  { country: "Ivory Coast", direction: "OffRamp", type: "Bank", provider: "Ecobank" },
  { country: "Ivory Coast", direction: "OffRamp", type: "Momo", provider: "Moov" },
  { country: "Ivory Coast", direction: "OffRamp", type: "Momo", provider: "Moov Money" },
  { country: "Ivory Coast", direction: "OffRamp", type: "Momo", provider: "MTN" },
  { country: "Ivory Coast", direction: "OffRamp", type: "Momo", provider: "Orange" },
  { country: "Ivory Coast", direction: "OnRamp", type: "Momo", provider: "Moov" },
  { country: "Ivory Coast", direction: "OnRamp", type: "Momo", provider: "MTN" },
  { country: "Ivory Coast", direction: "OnRamp", type: "Momo", provider: "Orange" },
  // ── Jamaica ──
  { country: "Jamaica", direction: "OffRamp", type: "Momo", provider: "Digicel MyCash" },
  // ── Kenya ──
  { country: "Kenya", direction: "OffRamp", type: "Bank", provider: "Absa Bank" },
  { country: "Kenya", direction: "OffRamp", type: "Bank", provider: "African Banking Corp." },
  { country: "Kenya", direction: "OffRamp", type: "Bank", provider: "Bank of Africa" },
  { country: "Kenya", direction: "OffRamp", type: "Bank", provider: "Bank of India" },
  { country: "Kenya", direction: "OffRamp", type: "Bank", provider: "Central Bank of Kenya" },
  { country: "Kenya", direction: "OffRamp", type: "Bank", provider: "Citibank" },
  { country: "Kenya", direction: "OffRamp", type: "Bank", provider: "Commercial Bank of Africa" },
  { country: "Kenya", direction: "OffRamp", type: "Bank", provider: "Consolidated Bank" },
  { country: "Kenya", direction: "OffRamp", type: "Bank", provider: "Co-operative Bank" },
  { country: "Kenya", direction: "OffRamp", type: "Bank", provider: "Credit Bank" },
  { country: "Kenya", direction: "OffRamp", type: "Bank", provider: "Development Bank of Kenya" },
  { country: "Kenya", direction: "OffRamp", type: "Bank", provider: "Diamond Trust Bank" },
  { country: "Kenya", direction: "OffRamp", type: "Bank", provider: "Ecobank" },
  { country: "Kenya", direction: "OffRamp", type: "Bank", provider: "Equity Bank" },
  { country: "Kenya", direction: "OffRamp", type: "Bank", provider: "First Community Bank" },
  { country: "Kenya", direction: "OffRamp", type: "Bank", provider: "Guaranty Trust Bank" },
  { country: "Kenya", direction: "OffRamp", type: "Bank", provider: "Gulf African Bank" },
  { country: "Kenya", direction: "OffRamp", type: "Bank", provider: "Habib Bank" },
  { country: "Kenya", direction: "OffRamp", type: "Bank", provider: "Housing Finance Bank" },
  { country: "Kenya", direction: "OffRamp", type: "Bank", provider: "I&M Bank" },
  { country: "Kenya", direction: "OffRamp", type: "Bank", provider: "Imperial Bank" },
  { country: "Kenya", direction: "OffRamp", type: "Bank", provider: "Jamii Bora Bank" },
  { country: "Kenya", direction: "OffRamp", type: "Bank", provider: "Kenya Commercial Bank" },
  { country: "Kenya", direction: "OffRamp", type: "Bank", provider: "Kenya Women Microfinance Bank" },
  { country: "Kenya", direction: "OffRamp", type: "Bank", provider: "Middle East Bank" },
  { country: "Kenya", direction: "OffRamp", type: "Bank", provider: "National Bank of Kenya" },
  { country: "Kenya", direction: "OffRamp", type: "Bank", provider: "NCBA" },
  { country: "Kenya", direction: "OffRamp", type: "Bank", provider: "Prime Bank" },
  { country: "Kenya", direction: "OffRamp", type: "Bank", provider: "SBM Bank" },
  { country: "Kenya", direction: "OffRamp", type: "Bank", provider: "Sidian Bank" },
  { country: "Kenya", direction: "OffRamp", type: "Bank", provider: "Stanbic Bank" },
  { country: "Kenya", direction: "OffRamp", type: "Bank", provider: "Standard Chartered Bank" },
  { country: "Kenya", direction: "OffRamp", type: "Bank", provider: "TransNational Bank" },
  { country: "Kenya", direction: "OffRamp", type: "Bank", provider: "Victoria Commercial Bank" },
  { country: "Kenya", direction: "OffRamp", type: "Momo", provider: "Airtel" },
  { country: "Kenya", direction: "OffRamp", type: "Momo", provider: "Equitel Money" },
  { country: "Kenya", direction: "OffRamp", type: "Momo", provider: "MPesa" },
  { country: "Kenya", direction: "OffRamp", type: "Momo", provider: "Safaricom" },
  { country: "Kenya", direction: "OnRamp", type: "Momo", provider: "Airtel" },
  { country: "Kenya", direction: "OnRamp", type: "Momo", provider: "MPesa" },
  { country: "Kenya", direction: "OnRamp", type: "Momo", provider: "Safaricom" },
  // ── Lesotho ──
  { country: "Lesotho", direction: "OffRamp", type: "Momo", provider: "Ecocash" },
  // ── Liberia ──
  { country: "Liberia", direction: "OffRamp", type: "Momo", provider: "MTN" },
  { country: "Liberia", direction: "OffRamp", type: "Momo", provider: "Orange Money" },
  // ── Madagascar ──
  { country: "Madagascar", direction: "OffRamp", type: "Momo", provider: "Airtel Money" },
  { country: "Madagascar", direction: "OffRamp", type: "Momo", provider: "Mvola" },
  { country: "Madagascar", direction: "OffRamp", type: "Momo", provider: "Orange Money" },
  // ── Malawi ──
  { country: "Malawi", direction: "OffRamp", type: "Bank", provider: "Ecobank" },
  { country: "Malawi", direction: "OffRamp", type: "Cash", provider: "Universal CashPick-up" },
  { country: "Malawi", direction: "OffRamp", type: "Momo", provider: "Airtel" },
  { country: "Malawi", direction: "OffRamp", type: "Momo", provider: "FDH UFULU Digital Wallet" },
  { country: "Malawi", direction: "OffRamp", type: "Momo", provider: "TNM Wallet" },
  { country: "Malawi", direction: "OnRamp", type: "Momo", provider: "Airtel" },
  { country: "Malawi", direction: "OnRamp", type: "Momo", provider: "MTN" },
  // ── Malaysia ──
  { country: "Malaysia", direction: "OffRamp", type: "Momo", provider: "BigPay" },
  { country: "Malaysia", direction: "OffRamp", type: "Momo", provider: "TNG Digital" },
  // ── Mali ──
  { country: "Mali", direction: "OffRamp", type: "Bank", provider: "Ecobank" },
  { country: "Mali", direction: "OffRamp", type: "Momo", provider: "Orange Money" },
  { country: "Mali", direction: "OnRamp", type: "Momo", provider: "Mobicash" },
  { country: "Mali", direction: "OnRamp", type: "Momo", provider: "Orange" },
  // ── Mexico ──
  { country: "Mexico", direction: "OffRamp", type: "Bank", provider: "All Banks (CLABE)" },
  // ── Mongolia ──
  { country: "Mongolia", direction: "OffRamp", type: "Momo", provider: "LendMN" },
  // ── Morocco ──
  { country: "Morocco", direction: "OffRamp", type: "Cash", provider: "Chaabi Cash pickup" },
  { country: "Morocco", direction: "OffRamp", type: "Momo", provider: "Inwi" },
  { country: "Morocco", direction: "OffRamp", type: "Momo", provider: "Orange Money" },
  // ── Mozambique ──
  { country: "Mozambique", direction: "OffRamp", type: "Momo", provider: "MPesa" },
  { country: "Mozambique", direction: "OffRamp", type: "Momo", provider: "Vodacom" },
  // ── Nepal ──
  { country: "Nepal", direction: "OffRamp", type: "Cash", provider: "EsewaRemit" },
  { country: "Nepal", direction: "OffRamp", type: "Cash", provider: "Everest Bank Branch & Agents" },
  { country: "Nepal", direction: "OffRamp", type: "Cash", provider: "IME Cash Pickup" },
  { country: "Nepal", direction: "OffRamp", type: "Momo", provider: "eSewa" },
  { country: "Nepal", direction: "OffRamp", type: "Momo", provider: "Icash" },
  { country: "Nepal", direction: "OffRamp", type: "Momo", provider: "IME Pay" },
  { country: "Nepal", direction: "OffRamp", type: "Momo", provider: "Khalti Wallet" },
  { country: "Nepal", direction: "OffRamp", type: "Momo", provider: "Moru" },
  { country: "Nepal", direction: "OffRamp", type: "Momo", provider: "Namastepay" },
  { country: "Nepal", direction: "OffRamp", type: "Momo", provider: "Qpay" },
  { country: "Nepal", direction: "OffRamp", type: "Momo", provider: "YoApp" },
  // ── Niger ──
  { country: "Niger", direction: "OffRamp", type: "Bank", provider: "Ecobank" },
  { country: "Niger", direction: "OffRamp", type: "Cash", provider: "Zamani Cash" },
  { country: "Niger", direction: "OffRamp", type: "Momo", provider: "Airtel" },
  { country: "Niger", direction: "OffRamp", type: "Momo", provider: "Moov" },
  // ── Nigeria ──
  { country: "Nigeria", direction: "OffRamp", type: "Bank", provider: "Ecobank" },
  { country: "Nigeria", direction: "OffRamp", type: "Cash", provider: "Baxi Agents" },
  { country: "Nigeria", direction: "OffRamp", type: "Momo", provider: "Airtel" },
  { country: "Nigeria", direction: "OffRamp", type: "Momo", provider: "MTN" },
  { country: "Nigeria", direction: "OffRamp", type: "Momo", provider: "Paga" },
  { country: "Nigeria", direction: "OffRamp", type: "Momo", provider: "SmartCash / Airtel" },
  // ── Pakistan ──
  { country: "Pakistan", direction: "OffRamp", type: "Cash", provider: "Cash Pick-up (BoP Agents)" },
  { country: "Pakistan", direction: "OffRamp", type: "Momo", provider: "Finja Wallet" },
  { country: "Pakistan", direction: "OffRamp", type: "Momo", provider: "Jazz Cash Wallet" },
  { country: "Pakistan", direction: "OffRamp", type: "Momo", provider: "SadaPay" },
  // ── Peru ──
  { country: "Peru", direction: "OffRamp", type: "Momo", provider: "Plin" },
  { country: "Peru", direction: "OffRamp", type: "Momo", provider: "Yape" },
  // ── Philippines ──
  { country: "Philippines", direction: "OffRamp", type: "Bank", provider: "Metrobank" },
  { country: "Philippines", direction: "OffRamp", type: "Momo", provider: "Coins" },
  { country: "Philippines", direction: "OffRamp", type: "Momo", provider: "GCash" },
  { country: "Philippines", direction: "OffRamp", type: "Momo", provider: "GrabPay" },
  { country: "Philippines", direction: "OffRamp", type: "Momo", provider: "PayMaya" },
  // ── Republic of Congo ──
  { country: "Republic of Congo", direction: "OffRamp", type: "Bank", provider: "Ecobank Congo Brazaville" },
  { country: "Republic of Congo", direction: "OffRamp", type: "Momo", provider: "Airtel" },
  { country: "Republic of Congo", direction: "OffRamp", type: "Momo", provider: "MTN" },
  // ── Rwanda ──
  { country: "Rwanda", direction: "OffRamp", type: "Momo", provider: "Airtel Money" },
  { country: "Rwanda", direction: "OffRamp", type: "Momo", provider: "Airtel" },
  { country: "Rwanda", direction: "OffRamp", type: "Momo", provider: "MTN" },
  { country: "Rwanda", direction: "OnRamp", type: "Momo", provider: "Airtel" },
  { country: "Rwanda", direction: "OnRamp", type: "Momo", provider: "MTN" },
  // ── Senegal ──
  { country: "Senegal", direction: "OffRamp", type: "Bank", provider: "Ecobank" },
  { country: "Senegal", direction: "OffRamp", type: "Momo", provider: "Free" },
  { country: "Senegal", direction: "OffRamp", type: "Momo", provider: "Mixx by Yas" },
  { country: "Senegal", direction: "OffRamp", type: "Momo", provider: "Orange Money" },
  { country: "Senegal", direction: "OffRamp", type: "Momo", provider: "Wave" },
  { country: "Senegal", direction: "OnRamp", type: "Momo", provider: "Free" },
  { country: "Senegal", direction: "OnRamp", type: "Momo", provider: "Orange" },
  { country: "Senegal", direction: "OnRamp", type: "Momo", provider: "Wave" },
  // ── Sierra Leone ──
  { country: "Sierra Leone", direction: "OffRamp", type: "Momo", provider: "Africell" },
  { country: "Sierra Leone", direction: "OffRamp", type: "Momo", provider: "Orange" },
  // ── Somalia ──
  { country: "Somalia", direction: "OffRamp", type: "Cash", provider: "Asal Xpress" },
  // ── South Africa ──
  { country: "South Africa", direction: "OffRamp", type: "Bank", provider: "EFT" },
  { country: "South Africa", direction: "OffRamp", type: "Bank", provider: "RTC" },
  { country: "South Africa", direction: "OffRamp", type: "Cash", provider: "Nedbank Cardless Withdrawal" },
  { country: "South Africa", direction: "OffRamp", type: "QR", provider: "Zapper" },
  { country: "South Africa", direction: "OnRamp", type: "Bank", provider: "Investec EFT" },
  { country: "South Africa", direction: "OnRamp", type: "Cash", provider: "EasyPay" },
  // ── South Sudan ──
  { country: "South Sudan", direction: "OffRamp", type: "Momo", provider: "M-Gurush" },
  // ── Sri Lanka ──
  { country: "Sri Lanka", direction: "OffRamp", type: "Momo", provider: "Ez Cash" },
  { country: "Sri Lanka", direction: "OffRamp", type: "Momo", provider: "mCash" },
  // ── Tanzania ──
  { country: "Tanzania", direction: "OffRamp", type: "Bank", provider: "ABSA Bank" },
  { country: "Tanzania", direction: "OffRamp", type: "Bank", provider: "Access Bank" },
  { country: "Tanzania", direction: "OffRamp", type: "Bank", provider: "Akiba Commercial Bank" },
  { country: "Tanzania", direction: "OffRamp", type: "Bank", provider: "Amana Bank" },
  { country: "Tanzania", direction: "OffRamp", type: "Bank", provider: "Banc ABC" },
  { country: "Tanzania", direction: "OffRamp", type: "Bank", provider: "Bank of Africa" },
  { country: "Tanzania", direction: "OffRamp", type: "Bank", provider: "Bank of Baroda" },
  { country: "Tanzania", direction: "OffRamp", type: "Bank", provider: "Canara Bank" },
  { country: "Tanzania", direction: "OffRamp", type: "Bank", provider: "Commercial Bank of Africa" },
  { country: "Tanzania", direction: "OffRamp", type: "Bank", provider: "CRDB Bank" },
  { country: "Tanzania", direction: "OffRamp", type: "Bank", provider: "DCB Commercial" },
  { country: "Tanzania", direction: "OffRamp", type: "Bank", provider: "Ecobank" },
  { country: "Tanzania", direction: "OffRamp", type: "Bank", provider: "Equity Bank" },
  { country: "Tanzania", direction: "OffRamp", type: "Bank", provider: "Exim Bank" },
  { country: "Tanzania", direction: "OffRamp", type: "Bank", provider: "FINCA Microfinance Bank" },
  { country: "Tanzania", direction: "OffRamp", type: "Bank", provider: "First National Bank" },
  { country: "Tanzania", direction: "OffRamp", type: "Bank", provider: "Guaranty Trust Bank" },
  { country: "Tanzania", direction: "OffRamp", type: "Bank", provider: "I&M Bank" },
  { country: "Tanzania", direction: "OffRamp", type: "Bank", provider: "KCB Bank" },
  { country: "Tanzania", direction: "OffRamp", type: "Bank", provider: "Letshego Bank" },
  { country: "Tanzania", direction: "OffRamp", type: "Bank", provider: "Maendeleo Bank" },
  { country: "Tanzania", direction: "OffRamp", type: "Bank", provider: "Mkombozi Bank" },
  { country: "Tanzania", direction: "OffRamp", type: "Bank", provider: "National Bank of Commerce" },
  { country: "Tanzania", direction: "OffRamp", type: "Bank", provider: "NMB Bank" },
  { country: "Tanzania", direction: "OffRamp", type: "Bank", provider: "Stanbic" },
  { country: "Tanzania", direction: "OffRamp", type: "Bank", provider: "Standard Chartered Bank" },
  { country: "Tanzania", direction: "OffRamp", type: "Bank", provider: "United Bank For Africa" },
  { country: "Tanzania", direction: "OffRamp", type: "Bank", provider: "Yetu Microfinance" },
  { country: "Tanzania", direction: "OffRamp", type: "Momo", provider: "Airtel Money" },
  { country: "Tanzania", direction: "OffRamp", type: "Momo", provider: "Airtel" },
  { country: "Tanzania", direction: "OffRamp", type: "Momo", provider: "Halotel" },
  { country: "Tanzania", direction: "OffRamp", type: "Momo", provider: "Mixx by Yas" },
  { country: "Tanzania", direction: "OffRamp", type: "Momo", provider: "MPesa" },
  { country: "Tanzania", direction: "OffRamp", type: "Momo", provider: "Tigo" },
  { country: "Tanzania", direction: "OffRamp", type: "Momo", provider: "Vodacom" },
  { country: "Tanzania", direction: "OnRamp", type: "Momo", provider: "Airtel" },
  { country: "Tanzania", direction: "OnRamp", type: "Momo", provider: "Halotel" },
  { country: "Tanzania", direction: "OnRamp", type: "Momo", provider: "Tigo" },
  { country: "Tanzania", direction: "OnRamp", type: "Momo", provider: "Vodacom" },
  // ── Thailand ──
  { country: "Thailand", direction: "OffRamp", type: "Bank", provider: "Kasikorn Bank" },
  // ── Togo ──
  { country: "Togo", direction: "OffRamp", type: "Bank", provider: "Ecobank" },
  { country: "Togo", direction: "OffRamp", type: "Momo", provider: "Mixx by Yas" },
  { country: "Togo", direction: "OffRamp", type: "Momo", provider: "Moov" },
  { country: "Togo", direction: "OffRamp", type: "Momo", provider: "Togocell" },
  { country: "Togo", direction: "OnRamp", type: "Momo", provider: "Moov" },
  { country: "Togo", direction: "OnRamp", type: "Momo", provider: "Togocell" },
  // ── Tonga ──
  { country: "Tonga", direction: "OffRamp", type: "Momo", provider: "Digicel MyCash" },
  // ── Turkey ──
  { country: "Turkey", direction: "OffRamp", type: "Bank", provider: "AkBank" },
  { country: "Turkey", direction: "OffRamp", type: "Bank", provider: "Aktif Yatirim Bankasi" },
  { country: "Turkey", direction: "OffRamp", type: "Bank", provider: "Albaraka Turk Katilim Bankasi" },
  { country: "Turkey", direction: "OffRamp", type: "Bank", provider: "Alternatiifbank" },
  { country: "Turkey", direction: "OffRamp", type: "Bank", provider: "Anadolubank" },
  { country: "Turkey", direction: "OffRamp", type: "Bank", provider: "Bank of China" },
  { country: "Turkey", direction: "OffRamp", type: "Bank", provider: "Bankpozitif Kredi" },
  { country: "Turkey", direction: "OffRamp", type: "Bank", provider: "Burgan Bank" },
  { country: "Turkey", direction: "OffRamp", type: "Bank", provider: "CitiBank" },
  { country: "Turkey", direction: "OffRamp", type: "Bank", provider: "Deniz Bank" },
  { country: "Turkey", direction: "OffRamp", type: "Bank", provider: "Yapi Ve Kredi Bankasi" },
  // ── UAE ──
  { country: "UAE", direction: "OffRamp", type: "Bank", provider: "Abu Dhabi Commercial Bank" },
  // ── Uganda ──
  { country: "Uganda", direction: "OffRamp", type: "Bank", provider: "ABC Capital Bank" },
  { country: "Uganda", direction: "OffRamp", type: "Bank", provider: "Bank of Africa" },
  { country: "Uganda", direction: "OffRamp", type: "Bank", provider: "Bank of Baroda" },
  { country: "Uganda", direction: "OffRamp", type: "Bank", provider: "Bank of India" },
  { country: "Uganda", direction: "OffRamp", type: "Bank", provider: "Barclays Bank" },
  { country: "Uganda", direction: "OffRamp", type: "Bank", provider: "Centenary Rural Development Bank" },
  { country: "Uganda", direction: "OffRamp", type: "Bank", provider: "Commercial Bank of Africa" },
  { country: "Uganda", direction: "OffRamp", type: "Bank", provider: "DFCU Bank" },
  { country: "Uganda", direction: "OffRamp", type: "Bank", provider: "Diamond Trust Bank" },
  { country: "Uganda", direction: "OffRamp", type: "Momo", provider: "Airtel Money" },
  { country: "Uganda", direction: "OffRamp", type: "Momo", provider: "Airtel" },
  { country: "Uganda", direction: "OffRamp", type: "Momo", provider: "MTN" },
  { country: "Uganda", direction: "OnRamp", type: "Momo", provider: "Airtel" },
  { country: "Uganda", direction: "OnRamp", type: "Momo", provider: "MTN" },
  // ── Vietnam ──
  { country: "Vietnam", direction: "OffRamp", type: "Cash", provider: "FinFan Agents" },
  { country: "Vietnam", direction: "OffRamp", type: "Momo", provider: "Momo" },
  { country: "Vietnam", direction: "OffRamp", type: "Momo", provider: "VNPT Pay" },
  { country: "Vietnam", direction: "OffRamp", type: "Momo", provider: "ZaloPay" },
  // ── Zambia ──
  { country: "Zambia", direction: "OffRamp", type: "Bank", provider: "Ecobank" },
  { country: "Zambia", direction: "OffRamp", type: "Momo", provider: "Airtel Money" },
  { country: "Zambia", direction: "OffRamp", type: "Momo", provider: "Airtel" },
  { country: "Zambia", direction: "OffRamp", type: "Momo", provider: "MTN" },
  { country: "Zambia", direction: "OffRamp", type: "Momo", provider: "Zamtel" },
  { country: "Zambia", direction: "OnRamp", type: "Momo", provider: "Airtel" },
  { country: "Zambia", direction: "OnRamp", type: "Momo", provider: "MTN" },
  { country: "Zambia", direction: "OnRamp", type: "Momo", provider: "Zamtel" },
  // ── Zimbabwe ──
  { country: "Zimbabwe", direction: "OffRamp", type: "Cash", provider: "Universal CashPick-up" },
  { country: "Zimbabwe", direction: "OffRamp", type: "Momo", provider: "Ecocash" },
  { country: "Zimbabwe", direction: "OffRamp", type: "Wallet", provider: "Omari" },
];

/** Group raw entries → sorted, deduplicated AddendumRow[] */
export function groupAddendum(entries: AddendumEntry[]): AddendumRow[] {
  const map = new Map<string, Set<string>>();

  for (const e of entries) {
    const key = `${e.country}||${e.direction}||${e.type}`;
    if (!map.has(key)) map.set(key, new Set());
    map.get(key)!.add(e.provider);
  }

  const rows: AddendumRow[] = [];
  for (const [key, provSet] of map.entries()) {
    const [country, direction, type] = key.split("||");
    rows.push({
      country,
      direction: direction as AddendumDirection,
      type: type as AddendumType,
      providers: [...provSet],
    });
  }

  // Sort by country → direction (OffRamp first) → type
  rows.sort((a, b) => {
    if (a.country !== b.country) return a.country.localeCompare(b.country);
    if (a.direction !== b.direction) return a.direction === "OffRamp" ? -1 : 1;
    return a.type.localeCompare(b.type);
  });

  return rows;
}

/** Split rows into pages of `pageSize` each */
export function paginateAddendum(rows: AddendumRow[], pageSize = 33): AddendumRow[][] {
  const pages: AddendumRow[][] = [];
  for (let i = 0; i < rows.length; i += pageSize) {
    pages.push(rows.slice(i, i + pageSize));
  }
  return pages;
}
