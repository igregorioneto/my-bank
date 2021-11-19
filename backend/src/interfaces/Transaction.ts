export interface TransactionInterface {
    _id?:string,
    user_id?:string,
    transfer_id?:string,
    value?:number,
    createdAt?: Date,
    type_transaction?:number
}