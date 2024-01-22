"use client";
import React, { useState , useEffect} from "react";

import {
    Card,
    CardContent,
    CardDescription,
    CardTitle,
  } from "@/components/ui/card";
import {Label} from "@/components/ui/label";

type StudentProfile = {
    id:string,
    name:string,
    DoB: string,
    fatherPhone:string,
    stage:string,
    status:string,
    // circle:string
};
import {createClient} from "@/utils/supabse/client";


export default function Profile() {
    const supabase = createClient();
    const [avatar , setAvatar] = useState("");
    const [student, setStudent] = useState<StudentProfile>({
        id: "111",
        name: "حسين لطفي الزاير",
        DoB: "1/1/1444",
        fatherPhone:"05050505050",
        stage:"أول متوسط",
        status:"مقبول",
    });
    useEffect(() => {
        getBucket()
    })
    const getBucket = async () => {
        const {data} = await supabase
        .storage
        .from('profile_picture')
        .getPublicUrl(`avatar_${student.id}.png`)

        setAvatar(data.publicUrl);
    }
    return(
        <div className="absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
            <Card className="p-7 space-y-2 flex flex-col items-center">
                <CardContent className="flex xl:flex-row flex-col  items-center mb-12 mt-12">
                    <CardTitle className="mb-6 xl:ml-16">
                        المعلومات الشحصية
                    </CardTitle>
                    <Card>
                        <img className="w-80" src={avatar}  />
                    </Card>
                </CardContent>
                <CardContent className="xl:flex text-center">
                    <CardContent className="ml-6 mr-6 ">
                        <CardContent className="flex flex-col  mb-6 items-center">
                            <Label className="text-lg mb-3">اسم الطالب الثلاثي </Label>
                            <Label>{student.name}</Label>
                        </CardContent>
                        <CardContent className="flex flex-col  items-center">
                            <Label className="text-lg mb-3">تاريخ الميلاد</Label>
                            <Label>{student.DoB}</Label>
                        </CardContent>
                    </CardContent>
                    <CardContent className="ml-6 mr-6">
                        <CardContent className="flex flex-col  mb-6 items-center">
                            <Label className="text-lg mb-3">المرحلة الدراسية</Label>
                            <Label>{student.stage}</Label>
                        </CardContent>
                        <CardContent className="flex flex-col  items-center">
                            <Label className="text-lg mb-3">رقم ولي الأمر</Label>
                            <Label>{student.fatherPhone}</Label>
                        </CardContent>
                    </CardContent>
                </CardContent>
                <CardContent className="flex flex-col items-center">
                            <Label className="text-lg mb-3">الحالة</Label>
                            <Label>{student.status}</Label>
                </CardContent>
            </Card>
        </div>
    );
}