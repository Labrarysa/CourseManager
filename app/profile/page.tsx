"use client";
import React, { useState /*, useEffect*/ } from "react";

{/*Importing Card components and Label component*/}
import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

{/*Type declaration for student profile*/}
type StudentProfile = {
    id: string,
    name: string,
    DoB: string,
    fatherPhone: string,
    stage: string,
    status: string,
};

// Commented out as it's currently not in use
// import { createClient } from "@/utils/supabse/client";

export default function Profile() {
    {/* State for avatar URL and student data */}
    const [avatar, setAvatar] = useState(""); 
    const [student, setStudent] = useState<StudentProfile>({
        id: "111",
        name: "حسين لطفي الزاير",
        DoB: "1/1/1444",
        fatherPhone: "05050505050",
        stage: "أول متوسط",
        status: "مقبول",
    });

{/*Code for fetching avatar from storage, currently commented out*/}
    // useEffect(() => {
    //     getBucket()
    // })
    // const getBucket = async () => {
    //     const { data } = await supabase
    //         .storage
    //         .from('profile_picture')
    //         .getPublicUrl(`avatar_${student.id}.png`)
    //     setAvatar(data.publicUrl);
    // }

    return (
        <div className="absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
            <Card className="p-7 space-y-2 flex flex-col items-center">
                {/* Displaying student's personal information */}
                <CardContent className="flex xl:flex-row flex-col items-center mb-12 mt-12">
                    <CardTitle className="mb-6 xl:ml-16">
                        المعلومات الشحصية
                    </CardTitle>
                    <Card>
                        {/* Student's Avatar */}
                        <img className="w-80" src={avatar} alt="Student Avatar" />
                    </Card>
                </CardContent>

                {/* Student details: name, DoB, stage, father's phone, and status */}
                <CardContent className="xl:flex text-center">
                    {/* Name and Date of Birth */}
                    <CardContent className="ml-6 mr-6 ">
                        {/* Student Name */}
                        <CardContent className="flex flex-col mb-6 items-center">
                            <Label className="text-lg mb-3">اسم الطالب الثلاثي </Label>
                            <Label>{student.name}</Label>
                        </CardContent>

                        {/* Date of Birth */}
                        <CardContent className="flex flex-col items-center">
                            <Label className="text-lg mb-3">تاريخ الميلاد</Label>
                            <Label>{student.DoB}</Label>
                        </CardContent>
                    </CardContent>

                    {/* Stage and Father's Phone */}
                    <CardContent className="ml-6 mr-6">
                        {/* Stage */}
                        <CardContent className="flex flex-col mb-6 items-center">
                            <Label className="text-lg mb-3">المرحلة الدراسية</Label>
                            <Label>{student.stage}</Label>
                        </CardContent>

                        {/* Father's Phone */}
                        <CardContent className="flex flex-col items-center">
                            <Label className="text-lg mb-3">رقم ولي الأمر</Label>
                            <Label>{student.fatherPhone}</Label>
                        </CardContent>
                    </CardContent>
                </CardContent>

                {/* Student Status */}
                <CardContent className="flex flex-col items-center">
                    <Label className="text-lg mb-3">الحالة</Label>
                    <Label>{student.status}</Label>
                </CardContent>
            </Card>
        </div>
    );
}
