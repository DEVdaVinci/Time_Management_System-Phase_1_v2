
export type ModelNames = "user" | "account" | "category" | "tag" | "action" | "activity" | "task";

//------------------------------------------------------------------------------------------------------
//Model Types
export interface User{
    id: string
    date_created: string
    date_modified: string
    username: string
    password: string
    email: string
}

export interface Account{
    id: string
    date_created: string
    date_modified: string
    user: User
    first_name: string
    last_name: string
    date_of_birth: string
}




export interface Category{
    id: string
    name: string
    description: string
    previous_version: string
    version_number_major: number
    version_number_minor: number
    date_created: string
    date_modified: string

    superior: string
    superiors_additional: string
    is_root: Boolean
}


    
    
export interface Tag{
    id: string
    name: string
    description: string
    previous_version: string
    version_number_major: number
    version_number_minor: number
    date_created: string
    date_modified: string

    superiors: string[]
    

}


export interface Action {
    id: string
    name: string
    description: string
    previous_version: string
    version_number_major: number
    version_number_minor: number
    date_created: string
    date_modified: string

    category: string
    categories_additional: string[]
    tags: string[]
    
}




export interface Activity{
    id: string
    name: string
    description: string
    previous_version: string
    version_number_major: number
    version_number_minor: number
    date_created: string
    date_modified: string

    actions: string[]
    category: string
    categories_additional: string[]
    tags: string[]

}
    




export interface Task{
    id: string
    name: string
    description: string
    previous_version: string
    version_number_major: number
    version_number_minor: number
    date_created: string
    date_modified: string    

    actions: string[]
    category: string
    categories_additional: string[]
    tags: string[]

    account: string
    activity: string
    status: string
}



export type UserWrite = Omit<User, "date_created" | "date_modified" | "id"> & {id?: string};
export type UserReadShallow = User;
export type UserReadDeep = UserReadShallow;

export type AccountWrite = Omit<Account, "date_created" | "date_modified" | "id" | "user"> & {id?: string, user: UserWrite};
export type AccountReadShallow = Account;
export type AccountReadDeep = 
    Omit<Account, "user"> 
    &
    {
        user: UserReadShallow
    };

export type LogIn = Pick<User, "username" | "password">
export type Register_User = Omit<UserWrite, "password"> & {password1: string, password2: string}
export type Register_Account = Omit<AccountWrite, "user"> & {user: Register_User}

export type CategoryWrite = Omit<Category, "date_created" | "date_modified" | "id"> & {id?: string};
export type CategoryReadShallow = Category;
export type CategoryReadDeep = 
    Omit<Category, "previous_version" | "superior" | "superiors_additional"> 
    &
    {
        previous_version: CategoryReadShallow,
        superior: CategoryReadShallow,
        superiors_additional: CategoryReadShallow[]
    };

export type TagWrite = Omit<Tag, "date_created" | "date_modified" | "id"> & {id?: string};
export type TagReadShallow = Tag;
export type TagReadDeep = 
    Omit<Tag, "previous_version" | "superiors"> 
    &
    {
        previous_version: TagReadShallow,
        superiors: TagReadShallow[],
    };

export type ActionWrite = Omit<Action, "date_created" | "date_modified" | "id"> & {id?: string};
export type ActionReadShallow = Action;
export type ActionReadDeep = 
    Omit<Action, "previous_version" | "category" | "categories_additional" | "tags"> 
    &
    {
        previous_version: ActionReadShallow,
        category: CategoryReadShallow,
        categories_additional: CategoryReadShallow[],
        tags: TagReadShallow[],
    };

export type ActivityWrite = Omit<Activity, "date_created" | "date_modified" | "id"> & {id?: string};
export type ActivityReadShallow = Activity;
export type ActivityReadDeep = 
    Omit<Activity, "previous_version" | "actions" | "category" | "categories_additional" | "tags"> 
    &
    {
        previous_version: ActivityReadShallow,
        actions: ActionReadShallow[],
        category: CategoryReadShallow,
        categories_additional: CategoryReadShallow[],
        tags: TagReadShallow[],
    };

export type TaskWrite = Omit<Task, "date_created" | "date_modified" | "id"> & {id?: string};
export type TaskReadShallow = Task;
export type TaskReadDeep = 
    Omit<Task, "previous_version" | "actions" | "category" | "categories_additional" | "tags" | "account" | "activity"> 
    &
    {
        previous_version: TaskReadShallow,
        actions: ActionReadShallow[],
        category: CategoryReadShallow,
        categories_additional: CategoryReadShallow[],
        tags: TagReadShallow[],
        account: AccountReadShallow,
        activity: ActivityReadShallow,
    };

//--------------------------------------------

export type ModelType<write, readShallow, readDeep> = {
    write: write,
    read_shallow: readShallow,
    read_deep: readDeep
}

export type ModelMap = {
    user: ModelType<UserWrite, UserReadShallow, UserReadDeep>;
    account: ModelType<AccountWrite, AccountReadShallow, AccountReadDeep>;
    category: ModelType<CategoryWrite, CategoryReadShallow, CategoryReadDeep>;
    tag: ModelType<TagWrite, TagReadShallow, TagReadDeep>;
    action: ModelType<ActionWrite, ActionReadShallow, ActionReadDeep>;
    activity: ModelType<ActivityWrite, ActivityReadShallow, ActivityReadDeep>;
    task: ModelType<TaskWrite, TaskReadShallow, TaskReadDeep>;
};

export type WriteRequest<M extends ModelNames> = ModelMap[M]["write"];
export type ReadResponse_Shallow<M extends ModelNames> = ModelMap[M]["read_shallow"];
export type ReadResponse_Deep<M extends ModelNames> = ModelMap[M]["read_deep"];
//============================================================================
//[Form]



//[API]


//[model info]
