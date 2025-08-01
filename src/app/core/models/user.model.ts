// user.interface.ts

// Coordinate interface for geographic locations
export interface Coordinates {
    lat: number;
    lng: number;
  }
  
  // Address interface for physical addresses
  export interface Address {
    address: string;
    city: string;
    state: string;
    stateCode: string;
    postalCode: string;
    coordinates: Coordinates;
    country: string;
  }
  
  // Hair characteristics interface
  export interface Hair {
    color: string;
    type: string;
  }
  
  // Banking information interface
  export interface Bank {
    cardExpire: string;
    cardNumber: string;
    cardType: string;
    currency: string;
    iban: string;
  }
  
  // Company information interface
  export interface Company {
    department: string;
    name: string;
    title: string;
    address: Address;
  }
  
  // Cryptocurrency information interface
  export interface Crypto {
    coin: string;
    wallet: string;
    network: string;
  }
  
  // Main User interface
  export interface User {
    id: number;
    firstName: string;
    lastName: string;
    maidenName: string;
    age: number;
    gender: 'male' | 'female' | 'other';
    email: string;
    phone: string;
    username: string;
    password: string;
    birthDate: string; // ISO date string format
    image: string; // URL to user image
    bloodGroup: string;
    height: number;
    weight: number;
    eyeColor: string;
    hair: Hair;
    ip: string;
    address: Address;
    macAddress: string;
    university: string;
    bank: Bank;
    company: Company;
    ein: string;
    ssn: string;
    userAgent: string;
    crypto: Crypto;
    role: 'admin' | 'user' | 'moderator';
  }
  
  // Optional: Create a type for user creation (without id)
  export type CreateUser = Omit<User, 'id'>;
  
  // Optional: Create a type for user updates (all fields optional except id)
  export type UpdateUser = Partial<User> & { id: number };
  
  // Optional: Create a public user type (without sensitive data)
  export type PublicUser = Omit<User, 'password' | 'ssn' | 'ein' | 'bank' | 'crypto' | 'ip' | 'macAddress'>;
  
  // Optional: Create types for specific use cases
  export type UserProfile = Pick<User, 'id' | 'firstName' | 'lastName' | 'email' | 'image' | 'role'>;
  
  export type UserContact = Pick<User, 'id' | 'firstName' | 'lastName' | 'email' | 'phone' | 'address'>;
  
  // Enums for better type safety (optional but recommended)
  export enum Gender {
    MALE = 'male',
    FEMALE = 'female',
    OTHER = 'other'
  }
  
  export enum UserRole {
    ADMIN = 'admin',
    USER = 'user', 
    MODERATOR = 'moderator'
  }
  
  export enum BloodGroup {
    A_POSITIVE = 'A+',
    A_NEGATIVE = 'A-',
    B_POSITIVE = 'B+',
    B_NEGATIVE = 'B-',
    AB_POSITIVE = 'AB+',
    AB_NEGATIVE = 'AB-',
    O_POSITIVE = 'O+',
    O_NEGATIVE = 'O-'
  }
  
  // Alternative User interface using enums for stricter typing
  export interface StrictUser {
    id: number;
    firstName: string;
    lastName: string;
    maidenName: string;
    age: number;
    gender: Gender;
    email: string;
    phone: string;
    username: string;
    password: string;
    birthDate: string;
    image: string;
    bloodGroup: BloodGroup;
    height: number;
    weight: number;
    eyeColor: string;
    hair: Hair;
    ip: string;
    address: Address;
    macAddress: string;
    university: string;
    bank: Bank;
    company: Company;
    ein: string;
    ssn: string;
    userAgent: string;
    crypto: Crypto;
    role: UserRole;
  }