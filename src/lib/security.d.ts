export declare function genSalt(): Promise<any>;
export declare function hashPassword(password: string, salt: string): Promise<any>;
export declare function comparePassword(password: string, hashedPassword: string): Promise<any>;
