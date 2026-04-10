import { Request, Response } from 'express';
declare const getUsers: (req: Request, res: Response) => Promise<void>;
declare const getUserById: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
declare const createUser: (req: Request, res: Response) => Promise<void>;
declare const updateUser: (req: Request, res: Response) => Promise<void>;
declare const deleteUser: (req: Request, res: Response) => Promise<void>;
export { getUsers, getUserById, createUser, updateUser, deleteUser };
//# sourceMappingURL=userController.d.ts.map