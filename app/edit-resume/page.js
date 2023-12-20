"use client";
import Header from '@/components/header';
import { useState } from 'react';
import defaultFormData from '@/resume.json';
import BasicsFormInputs from '@/components/formInputs/basicsFormInputs';
import EducationFormInputs from '@/components/formInputs/educationFormInputs';
import WorkFormInputs from '@/components/formInputs/workFormInputs';
import SkillsFormInputs from '@/components/formInputs/skillsFormInputs';

export default function EditResume() {

    const localFormData = localStorage.getItem('resumeData');
    const [formData, setFormData] = useState(JSON.parse(localFormData) || defaultFormData);

    const handleSubmit = (event) => {
        event.preventDefault();
        localStorage.setItem('resumeData', JSON.stringify(formData));
        console.log(formData);
    }

    const clearFormData = () => {
        localStorage.removeItem('resumeData');
        setFormData(defaultFormData);
    }

    return (
        <>
            <Header />
            <pre>{JSON.stringify(formData, null, 2)}</pre>
            <button
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                onClick={() => clearFormData()}>
                Clear
            </button>
            <form onSubmit={handleSubmit} className="flex flex-col items-center justify-between p-24 gap-8 max-w-7xl mx-auto">
                <BasicsFormInputs formData={formData} setFormData={setFormData} />
                <EducationFormInputs formData={formData} setFormData={setFormData} />
                <WorkFormInputs formData={formData} setFormData={setFormData} />
                <SkillsFormInputs formData={formData} setFormData={setFormData} />
                <button
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                    type="submit">Save</button>
            </form>
        </>
    );
};