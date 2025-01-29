
interface Teacher {
    id: number;
    name: string;
    subject: string;
}

export default function Teachers({ teachers }: { teachers: Teacher[] }) {

    

    return (
        <div className="flex flex-col gap-8">
            {teachers.map((teacher) => {
                return (
                    <div key={teacher.id} className="w-full shadow-md p-4 flex gap-4 border">
                        <div className="flex flex-col gap-4 items-center">
                            <div className="bg-gradient-to-b from-transparent to-black-opacity-30 w-48 h-48 rounded-full">
                            </div>
                            <h1 className="text-2xl font-bold ">{teacher.name}</h1>
                        </div>
                        <div>
                            <p>{teacher.subject}</p>
                        </div>
                    </div>
                )
            })}
        </div>
    );
}