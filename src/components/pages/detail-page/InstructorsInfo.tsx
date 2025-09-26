'use client'

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';

export type Instructor = {
  id: string;
  name: string;
  specialty?: string;
  avatar?: string;
};

interface InstructorsInfoProps {
  instructors: Instructor[];
}

export default function InstructorsInfo({ instructors }: InstructorsInfoProps) {
  const hasInstructor = Array.isArray(instructors) && instructors.length > 0;
  const instructor = hasInstructor
    ? instructors[0]
    : { id: 'default', name: 'Giảng viên', specialty: undefined, avatar: undefined };

  return (
    <div className="max-w-lg mx-auto ">
      <Card className="border rounded-2xl shadow-md p-4 bg-white">
        {instructor.avatar ? (
          <img src={instructor.avatar} alt={instructor.name} className="w-full h-52 object-cover rounded-xl" />
        ) : (
          <div className="w-full h-52 bg-gray-100 rounded-xl flex items-center justify-center text-gray-500">
            {instructor.name?.charAt(0)}
          </div>
        )}
        <CardHeader>
          <CardTitle className="text-xl font-bold">{instructor.name}</CardTitle>
          {instructor.specialty && (
            <CardDescription className="text-gray-500">{instructor.specialty}</CardDescription>
          )}
        </CardHeader>
        <CardContent className="mt-2 space-y-2">
          {/* Placeholder for more instructor details when backend provides */}
        </CardContent>
      </Card>
    </div>
  );
}
