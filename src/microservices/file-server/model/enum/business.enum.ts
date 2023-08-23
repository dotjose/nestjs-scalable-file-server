export enum PhoneType {
  fixed,
  mobile,
  satelite,
  virtual,
}

export enum Encoding {
  numbers,
  international,
  text,
}

export enum AddressRelationType {
  near_by,
  crossing,
  opposite_to,
  inside_of,
  behind,
  infront,
}

export enum DocumentPurpose {
  KYC='kyc',
  KYB='kyb',
  PEPANDSANCTION='pep-sanction',
}

export enum DocumentTypes {
  PASSPORT = "passport",
  ID_FRONT_SIDE = "id_front_side",
  ID_BACK_SIDE = "id_back_side",
  SELFIE = "selfie",
  LIVELINESS_DETECTION = "liveliness_detection",
  REGISTRATION_ADDRESS = "registration_address",
  MEMORANDUM_AND_ARTICLES_OF_ASSOCIATE = "memorandum_and_articles_of_associate",
  CERTIFICATE_OF_INCORPORATION = "certificate_of_incorporation",
  ACCOUNT_AUTHORITY = "account_authority",
  SHARE_HOLDER_STRUCTURE = "share_holder_structure",
  OPERATION_ADDRESS = "operation_address",
  PROOF_OF_ADDRESS = "proof_of_address",
}

export enum DocumentStatus {
  UNDERVERIFICATION = "underverification",
  VERIFIED = "verified",
  DECLINED = "declined",
  PENDING = "pending",
  EXPIRED = "expired",
  UNREADABLE = "unreadable",
  PENDING_MANUAL_VERIFICATION = "pending manual verification",
  INVALID = "invalid",
}

export enum MetaDataType {
  NUMBER,
  BOOLEAN,
  JSON,
  STRING,
}

export enum Gender {
  Male,
  Female,
  NonBinary,
  TransGender,
  Other,
  PreferNotToTell,
}

export enum CustomerType {
  Organization,
  Person,
}

export enum CustomerCategory {
  category1,
  category2,
  category3,
}

export enum CustomerStatus {
  new,
  verified,
  under_verification,
  blacklisted,
  under_investigation,
  dispute,
  on_hold,
  bankcrupted,
}

export enum TargetType {
  SMS,
  EMAIL,
}