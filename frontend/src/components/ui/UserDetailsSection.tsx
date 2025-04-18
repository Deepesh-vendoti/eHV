import React from 'react';

interface UserDetails {
  name: string;
  dateOfBirth: string;
  email: string;
  age: number;
}

interface UserDetailsSectionProps {
  userDetails: UserDetails;
}

export default function UserDetailsSection({ userDetails }: UserDetailsSectionProps) {
  return (
    <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
      <h2 className="text-2xl font-semibold mb-4">Patient Information</h2>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-sm text-gray-500">Name</p>
          <p className="font-medium">{userDetails.name}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Age</p>
          <p className="font-medium">{userDetails.age} years</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Date of Birth</p>
          <p className="font-medium">{new Date(userDetails.dateOfBirth).toLocaleDateString()}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Email</p>
          <p className="font-medium">{userDetails.email}</p>
        </div>
      </div>
    </div>
  );
} 