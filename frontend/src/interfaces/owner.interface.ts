export interface Owner {
    _id: string;
    name: string;
    surname: string;
    dni: number;
    phone: string;
    address: string | null;
    userId: string;
    createdAt: string;
    updatedAt: string;
}

export interface OwnerFormData {
    name: string;
    surname: string;
    dni: number | '';
    phone: string;
    address?: string | null;
}

export interface OwnerResponse {
    success: boolean;
    data: Owner | Owner[];
    message?: string;
}
