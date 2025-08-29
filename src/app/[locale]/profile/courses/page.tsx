"use client";

import { useState } from "react";
import { Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import Modal from "@/components/pages/profile-page/Modal";

import aiw from "@/assets/aiw.png";

interface Course {
  name: string;
  progress: number;
  status?: "In Progress" | "Completed";
  image: string;
}

interface Certificate {
  title: string;
  date: string;
  issuer: string;
  description?: string;
  recipient?: string;
}

export default function ProfileCourses() {
  const [activeTab, setActiveTab] = useState<"courses" | "certificates">("courses");
  const [selectedCert, setSelectedCert] = useState<Certificate | null>(null);

  const courses: Course[] = [
    {
      name: "React Basics",
      progress: 75,
      status: "In Progress",
      image: "/courses/react-basics.jpg",
    },
    {
      name: "Advanced JavaScript",
      progress: 50,
      status: "In Progress",
      image: "/courses/advanced-js.jpg",
    },
    {
      name: "TypeScript Essentials",
      progress: 100,
      status: "Completed",
      image: "/courses/typescript.jpg",
    },
  ];

  const certificates: Certificate[] = [
    {
      title: "React Basics Certificate",
      date: "12/06/2025",
      issuer: "Coursera",
      description: "Completed the React Basics course with distinction.",
      recipient: "Hồ Văn Duy",
    },
    {
      title: "Advanced JavaScript Certificate",
      date: "18/07/2025",
      issuer: "Udemy",
      description: "Mastered advanced JavaScript concepts and projects.",
      recipient: "Hồ Văn Duy",
    },
  ];

  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-3xl font-bold">My Learning</h1>
        <p className="mt-2 ">View your enrolled courses and earned certificates.</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-4 border-b border-gray-200 mb-4">
        {["courses", "certificates"].map((tab) => (
          <button
            key={tab}
            className={`px-4 py-2 font-medium cursor-pointer ${
              activeTab === tab
                ? "border-b-2 border-amber-500 text-amber-500"
                : " hover:text-amber-500"
            }`}
            onClick={() => setActiveTab(tab as "courses" | "certificates")}
          >
            {tab === "courses" ? "Courses" : "Certificates"}
          </button>
        ))}
      </div>

      {/* Courses Tab */}
      {activeTab === "courses" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course, idx) => (
            <Card key={idx} className="shadow-sm  shadow-white transition cursor-pointer flex flex-col gap-3">
              <CardHeader className="p-0 relative h-36 overflow-hidden">
                <Image
                  src={aiw.src}
                  alt={course.name}
                  fill
                  className="object-cover"
                />
                {course.status && (
                  <span
                    className={`absolute top-3 left-3 px-3 py-1 rounded-full text-sm font-medium text-white backdrop-blur ${
                      course.status === "Completed"
                        ? "bg-green-500/90"
                        : "bg-yellow-500/90"
                    }`}
                  >
                    {course.status}
                  </span>
                )}
              </CardHeader>

              <CardContent className="px-4 pb-4 space-y-2">
                <CardTitle className="text-lg font-semibold">{course.name}</CardTitle>
                <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden mt-1">
                  <div
                    className={`h-3 rounded-full transition-all duration-500 ${
                      course.status === "Completed"
                        ? "bg-gradient-to-r from-green-400 to-green-600"
                        : "bg-gradient-to-r from-blue-400 to-indigo-600"
                    }`}
                    style={{ width: `${course.progress}%` }}
                  />
                </div>
                <p className="text-right text-sm font-medium">{course.progress}% completed</p>
              </CardContent>

              <CardFooter className="flex gap-2 px-4 pb-4">
                <Button variant="default" className="flex items-center gap-1">
                  View Lessons
                </Button>
                {course.status !== "Completed" && (
                  <Button variant="outline" className="flex items-center gap-1">
                    Mark Complete
                  </Button>
                )}
              </CardFooter>
            </Card>
          ))}
        </div>
      )}

      {/* Certificates Tab */}
      {activeTab === "certificates" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certificates.map((cert, idx) => (
            <Card key={idx} className="shadow-sm shadow-white p-4 transition flex flex-col gap-3">
              <CardHeader className="flex items-center gap-3">
                <div className="p-3 rounded-full bg-yellow-100 text-yellow-600">
                  <Award size={28} />
                </div>
                <CardTitle className="text-lg font-semibold">{cert.title}</CardTitle>
              </CardHeader>

              <CardContent className="px-4 pb-4 text-sm space-y-1">
                <p>Issued by: <span className="font-medium">{cert.issuer}</span></p>
                <p>Date: {cert.date}</p>
              </CardContent>

              <CardFooter className="px-4 pb-4">
                <Button
                  variant="default"
                  className="w-full flex items-center gap-1 "
                  onClick={() => setSelectedCert(cert)}
                >
                  View Certificate
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}

      {/* Certificate Modal */}
      {selectedCert && (
        <Modal
          isOpen={true}
          title={selectedCert.title}
          onClose={() => setSelectedCert(null)}
        >
          <div className="relative w-full max-w-md bg-gradient-to-br from-yellow-50 via-yellow-100 to-yellow-50 border-4 border-blue-600 rounded-2xl p-8 shadow-lg mx-auto">
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-gray-200 text-7xl font-bold select-none opacity-10">
              CERTIFICATE
            </div>

            <div className="flex justify-center mb-4">
              <Award size={48} className="text-yellow-500" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">{selectedCert.title}</h2>
            <p className="text-gray-700 mb-4">
              This certifies that <span className="font-semibold">{selectedCert.recipient}</span>
            </p>
            <p className="text-gray-600 italic mb-6">{selectedCert.description}</p>

            <div className="flex justify-between items-center mt-8">
              <div className="text-left">
                <p className="text-gray-700 font-medium">{selectedCert.issuer}</p>
                <p className="text-gray-500 text-sm">Issuer</p>
              </div>

              <div className="flex flex-col items-center">
                <div className="w-16 h-16 rounded-full border-4 border-red-600 flex items-center justify-center bg-red-100 relative">
                  <svg className="absolute w-6 h-6 text-red-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2l2.39 7.36h7.74l-6.26 4.54 2.39 7.36-6.26-4.53-6.26 4.53 2.39-7.36-6.26-4.54h7.74L12 2z" />
                  </svg>
                </div>
                <p className="text-red-600 font-semibold text-xs mt-1">Official Seal</p>
              </div>

              <div className="text-right">
                <p className="text-gray-700 font-medium">{selectedCert.date}</p>
                <p className="text-gray-500 text-sm">Date</p>
              </div>
            </div>

            <div className="mt-4 flex justify-end gap-2">
              <Button variant="outline" onClick={() => setSelectedCert(null)}>
                Close
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
