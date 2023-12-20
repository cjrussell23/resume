"use client";
import Header from '@/components/header';
import { useState, useEffect } from 'react';
import defaultFormData from '@/resume.json';
import { FaTrash, FaPlusCircle } from 'react-icons/fa';

const profileOptions = [
    {
        label: 'Facebook',
        prefix: 'https://www.facebook.com/',
    },
    {
        label: 'GitHub',
        prefix: 'https://www.github.com/',
    },
    {
        label: 'Instagram',
        prefix: 'https://www.instagram.com/',
    },
    {
        label: 'LinkedIn',
        prefix: 'https://www.linkedin.com/in/',
    },
    {
        label: 'Pinterest',
        prefix: 'https://www.pinterest.com/',
    },
    {
        label: 'Twitter',
        prefix: 'https://www.twitter.com/',
    },
    {
        label: 'YouTube',
        prefix: 'https://www.youtube.com/user/',
    },
];

export default function EditResume() {

    const localFormData = localStorage.getItem('resumeData');
    const [formData, setFormData] = useState(JSON.parse(localFormData) || defaultFormData);

    const handleChange = (event) => {
        const { name, value } = event.target;
        console.log(name, value);
        if (name.includes('location')) {
            const field = name.split('.')[1];
            setFormData({
                ...formData,
                basics: {
                    ...formData.basics,
                    location: {
                        ...formData.basics.location,
                        [field]: value,
                    },
                },
            });
        }
        else if (name.includes('profiles')) {
            const field = name.split('.')[2];
            const index = name.split('.')[1];
            setFormData({
                ...formData,
                basics: {
                    ...formData.basics,
                    profiles: formData.basics.profiles.map((profile, i) => {
                        if (i === parseInt(index, 10)) {
                            return {
                                ...profile,
                                [field]: value,
                            };
                        }
                        return profile;
                    }),
                },
            });
        }
        else if (name.includes('work')) {
            const field = name.split('.')[2];
            const index = name.split('.')[1];
            if (field === 'highlights') {
                const highlightIndex = name.split('.')[3];
                setFormData({
                    ...formData,
                    work: formData.work.map((job, i) => {
                        if (i === parseInt(index, 10)) {
                            return {
                                ...job,
                                highlights: job.highlights.map((highlight, j) => {
                                    if (j === parseInt(highlightIndex, 10)) {
                                        return value;
                                    }
                                    return highlight;
                                }),
                            };
                        }
                        return job;
                    }),
                });
            }
            else {
                setFormData({
                    ...formData,
                    work: formData.work.map((job, i) => {
                        if (i === parseInt(index, 10)) {
                            return {
                                ...job,
                                [field]: value,
                            };
                        }
                        return job;
                    }),
                });
            }
        }
        else {
            setFormData({
                ...formData,
                basics: {
                    ...formData.basics,
                    [name]: value,
                },
            });
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        localStorage.setItem('resumeData', JSON.stringify(formData));
        console.log(formData);
    }

    const clearFormData = () => {
        localStorage.removeItem('resumeData');
        setFormData(defaultFormData);
    }

    const addEntry = (name) => () => {
        console.log(name);
        if (name === 'work') {
            setFormData({
                ...formData,
                work: [
                    ...formData.work,
                    {
                        company: '',
                        position: '',
                        website: '',
                        startDate: '',
                        endDate: '',
                        summary: '',
                    }
                ],
            });
        }
        else if (name === 'profile') {
            setFormData({
                ...formData,
                basics: {
                    ...formData.basics,
                    profiles: [
                        ...formData.basics.profiles,
                        {
                            network: '',
                            username: '',
                            url: '',
                        },
                    ],
                },
            });
        }
    }

    const addWorkHighlight = (index) => () => {
        setFormData({
            ...formData,
            work: formData.work.map((job, i) => {
                if (i === index) {
                    return {
                        ...job,
                        highlights: job.highlights ? [...job.highlights, ''] : [''],
                    };
                }
                return job;
            }),
        });
    }

    const removeProfile = (index) => () => {
        setFormData({
            ...formData,
            basics: {
                ...formData.basics,
                profiles: formData.basics.profiles.filter((profile, i) => i !== index),
            },
        });
    }

    const removeWork = (index) => () => {
        setFormData({
            ...formData,
            work: formData.work.filter((job, i) => i !== index),
        });
    }

    const removeWorkHighlight = (index, highlightIndex) => () => {
        setFormData({
            ...formData,
            work: formData.work.map((job, i) => {
                if (i === index) {
                    return {
                        ...job,
                        highlights: job.highlights.filter((highlight, j) => j !== highlightIndex),
                    };
                }
                return job;
            }),
        });
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
                <div className="flex gap-8 w-full flex-wrap">
                    <div id='basics' className="border-2 border-gray-900 rounded min-w-[600px] grow">
                        <h2 className="text-2xl font-bold bg-gray-900 p-4">
                            Basics
                        </h2>
                        <div className="grid grid-cols-2 gap-4 p-4 bg-gray-800">
                            <label className="flex flex-col">
                                <span className="text-xl font-bold">
                                    Name</span>
                                <input
                                    className='p-2 rounded text-black'
                                    type="text"
                                    name="name"
                                    value={formData.basics.name}
                                    onChange={handleChange}
                                />
                            </label>
                            <label className="flex flex-col">
                                <span className="text-xl font-bold">Label</span>
                                <input
                                    className='p-2 rounded text-black'
                                    type="text"
                                    name="label"
                                    value={formData.basics.label}
                                    onChange={handleChange}
                                />
                            </label>
                            <label className="flex flex-col">
                                <span className="text-xl font-bold">Email</span>
                                <input
                                    className='p-2 rounded text-black'
                                    type="text"
                                    name="email"
                                    value={formData.basics.email}
                                    onChange={handleChange}
                                />
                            </label>
                            <label className="flex flex-col">
                                <span className="text-xl font-bold">Phone</span>
                                <input
                                    className='p-2 rounded text-black'
                                    type="text"
                                    name="phone"
                                    value={formData.basics.phone}
                                    onChange={handleChange}
                                />
                            </label>
                            <label className="flex flex-col">
                                <span className="text-xl font-bold">URL</span>
                                <input
                                    className='p-2 rounded text-black'
                                    type="text"
                                    name="url"
                                    value={formData.basics.url}
                                    onChange={handleChange}
                                />
                            </label>
                            <label className="flex flex-col">
                                <span className="text-xl font-bold">Address</span>
                                <input
                                    className='p-2 rounded text-black'
                                    type="text"
                                    name="location.address"
                                    value={formData.basics?.location?.address}
                                    onChange={handleChange}
                                />
                            </label>
                            <label className="flex flex-col">
                                <span className="text-xl font-bold">Postal Code</span>
                                <input
                                    className='p-2 rounded text-black'
                                    type="text"
                                    name="location.postalCode"
                                    value={formData.basics?.location?.postalCode}
                                    onChange={handleChange}
                                />
                            </label>
                            <label className="flex flex-col">
                                <span className="text-xl font-bold">Country</span>
                                <input
                                    className='p-2 rounded text-black'
                                    type="text"
                                    name="location.country"
                                    value={formData.basics.location.countryCode}
                                    onChange={handleChange}
                                />
                            </label>
                            <label className="flex flex-col">
                                <span className="text-xl font-bold">City</span>
                                <input
                                    className='p-2 rounded text-black'
                                    type="text"
                                    name="location.city"
                                    value={formData.basics.location.region}
                                    onChange={handleChange}
                                />
                            </label>
                            <label className="flex flex-col col-span-2">
                                <span className="text-xl font-bold">Summary</span>
                                {/* Resizable text box */}
                                <textarea
                                    className='p-2 rounded text-black h-24'
                                    name="summary"
                                    value={formData.basics.summary}
                                    onChange={handleChange}
                                />
                            </label>
                        </div>
                    </div>
                    <div id='profiles'
                        className="border-2 border-gray-900 rounded min-w-[300px] grow">
                        {/* Add profile button */}
                        <div className="flex items-center justify-between gap-4 bg-gray-900 p-4">
                            <h2 className="text-2xl font-bold">Profiles</h2>
                            <button
                                className="text-green-500 hover:text-green-700"
                                type="button"
                                onClick={addEntry('profile')}

                            >
                                {<FaPlusCircle />}
                            </button>
                        </div>
                        {formData?.basics?.profiles?.map((profile, index) => (
                            <div key={index} className="flex flex-col gap-4 p-4 bg-gray-800 border-b-2 border-gray-900">
                                <div className="flex items-center justify-between">
                                    <h3 className="text-xl font-bold">Profile {index + 1}</h3>
                                    <button
                                        className="text-red-500 hover:text-red-700"
                                        type="button"
                                        onClick={removeProfile(index)}
                                    >
                                        {<FaTrash />}
                                    </button>
                                </div>
                                <label className="flex flex-col">
                                    <span className="text-xl font-bold flex items-center justify-between">
                                        Social Network
                                    </span>
                                    <select
                                        className='p-2 rounded text-black'
                                        name={`profiles.${index}.network`}
                                        value={profile.network}
                                        onChange={handleChange}
                                    >
                                        {profileOptions.map((option) => (
                                            <option key={option.label} value={option.label} className='text-black'>
                                                {option.label}
                                            </option>
                                        ))}
                                    </select>
                                </label>

                                <label className="flex flex-col">
                                    <span className="text-xl font-bold">Username</span>
                                    <input
                                        className='p-2 rounded text-black'
                                        type="text"
                                        name={`profiles.${index}.username`}
                                        value={profile.username}
                                        onChange={handleChange}
                                    />
                                </label>
                                <label className="flex flex-col">
                                    <span className="text-xl font-bold">URL</span>
                                    <input
                                        className='p-2 rounded text-black'
                                        type="text"
                                        name={`profiles.${index}.url`}
                                        value={profile.url}
                                        onChange={handleChange}
                                    />
                                </label>
                            </div>
                        ))}
                    </div>
                </div>
                <div id='work' className="border-2 border-gray-900 rounded w-full">
                    <div className="flex items-center justify-between gap-4 bg-gray-900 p-4">
                        <h2 className="text-2xl font-bold">Work</h2>
                        <button
                            className="text-green-500 hover:text-green-700"
                            type="button"
                            onClick={addEntry('work')}

                        >
                            {<FaPlusCircle />}
                        </button>
                    </div>
                    {formData?.work?.map((job, index) => (
                        <div key={index} className="flex flex-col gap-4 p-4 bg-gray-800 border-b-2 border-gray-900 w-full">
                            <div className="flex items-center justify-between">
                                <h3 className="text-xl font-bold">Job {index + 1}</h3>
                                <button
                                    className="text-red-500 hover:text-red-700"
                                    type="button"
                                    onClick={removeWork(index)}
                                >
                                    {<FaTrash />}
                                </button>
                            </div>
                            <label className="flex flex-col">
                                <span className="text-xl font-bold">Company</span>
                                <input
                                    className='p-2 rounded text-black'
                                    type="text"
                                    name={`work.${index}.company`}
                                    value={job.company}
                                    onChange={handleChange}
                                />
                            </label>
                            <label className="flex flex-col">
                                <span className="text-xl font-bold">Position</span>
                                <input
                                    className='p-2 rounded text-black'
                                    type="text"
                                    name={`work.${index}.position`}
                                    value={job.position}
                                    onChange={handleChange}
                                />
                            </label>
                            <label className="flex flex-col">
                                <span className="text-xl font-bold">Website</span>
                                <input
                                    className='p-2 rounded text-black'
                                    type="text"
                                    name={`work.${index}.website`}
                                    value={job.website}
                                    onChange={handleChange}
                                />
                            </label>
                            <label className="flex flex-col">
                                <span className="text-xl font-bold">Start Date</span>
                                <input
                                    className='p-2 rounded text-black'
                                    type="date"
                                    name={`work.${index}.startDate`}
                                    value={job.startDate}
                                    onChange={handleChange}
                                />
                            </label>
                            <label className="flex flex-col">
                                <span className="text-xl font-bold">End Date</span>
                                <input
                                    className='p-2 rounded text-black'
                                    type="date"
                                    name={`work.${index}.endDate`}
                                    value={job.endDate}
                                    onChange={handleChange}
                                />
                            </label>
                            <label className="flex flex-col col-span-2">
                                <span className="text-xl font-bold">Summary</span>
                                {/* Resizable text box */}
                                <textarea
                                    className='p-2 rounded text-black h-24'
                                    name={`work.${index}.summary`}
                                    value={job.summary}
                                    onChange={handleChange}
                                />
                            </label>
                            <div className="flex flex-col border-2 border-gray-900">
                                <div className="flex items-center justify-between bg-gray-900 p-4">
                                <h2 className="text-2xl font-bold">Highlights</h2>
                                <button
                                    className="text-green-500 hover:text-green-700"
                                    type="button"
                                    onClick={addWorkHighlight(index)}

                                >
                                    {<FaPlusCircle />}
                                </button>
                                </div>
                                <div className="flex items-center justify-center flex-wrap">
                                    {job?.highlights?.map((highlight, highlightIndex) => (
                                        <div key={highlightIndex} className="flex flex-col gap-4 w-full bg-gray-700 p-4 border-b-2 border-gray-900">
                                            <div className="flex items-center justify-between">
                                                <h3 className="text-xl font-bold">Highlight {highlightIndex + 1}</h3>
                                                <button
                                                    className="text-red-500 hover:text-red-700"
                                                    type="button"
                                                    onClick={removeWorkHighlight(index, highlightIndex)}
                                                >
                                                    {<FaTrash />}
                                                </button>
                                            </div>
                                            <label className="flex flex-col col-span-2">
                                                <textarea
                                                    className='p-2 rounded text-black h-24'
                                                    name={`work.${index}.highlights.${highlightIndex}`}
                                                    value={highlight}
                                                    onChange={handleChange}
                                                />
                                            </label>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div id='education' className="border-2 border-gray-900 rounded w-full">
                    <div className="flex items-center justify-between gap-4 bg-gray-900 p-4">
                        <h2 className="text-2xl font-bold">Education</h2>
                        <button
                            className="text-green-500 hover:text-green-700"
                            type="button"
                            onClick={addEntry('education')}

                        >
                            {<FaPlusCircle />}
                        </button>
                    </div>
                    {formData?.education?.map((education, index) => (
                        <div key={index} className="flex flex-col gap-4 p-4 bg-gray-800 border-b-2 border-gray-900 w-full">
                            <div className="flex items-center justify-between">
                                <h3 className="text-xl font-bold">Education {index + 1}</h3>
                                <button
                                    className="text-red-500 hover:text-red-700"
                                    type="button"
                                    onClick={removeWork(index)}
                                >
                                    {<FaTrash />}
                                </button>
                            </div>
                            <label className="flex flex-col">
                                <span className="text-xl font-bold">Institution</span>
                                <input
                                    className='p-2 rounded text-black'
                                    type="text"
                                    name={`education.${index}.institution`}
                                    value={education.institution}
                                    onChange={handleChange}
                                />
                            </label>
                            <label className="flex flex-col">
                                <span className="text-xl font-bold">Area</span>
                                <input
                                    className='p-2 rounded text-black'
                                    type="text"
                                    name={`education.${index}.area`}
                                    value={education.area}
                                    onChange={handleChange}
                                />
                            </label>
                            <label className="flex flex-col">
                                <span className="text-xl font-bold">Study Type</span>
                                <input
                                    className='p-2 rounded text-black'
                                    type="text"
                                    name={`education.${index}.studyType`}
                                    value={education.studyType}
                                    onChange={handleChange}
                                />
                            </label>
                            <label className="flex flex-col">
                                <span className="text-xl font-bold">Start Date</span>
                                <input
                                    className='p-2 rounded text-black'
                                    type="date"
                                    name={`education.${index}.startDate`}
                                    value={education.startDate}
                                    onChange={handleChange}
                                />
                            </label>
                            <label className="flex flex-col">
                                <span className="text-xl font-bold">End Date</span>
                                <input
                                    className='p-2 rounded text-black'
                                    type="date"
                                    name={`education.${index}.endDate`}
                                    value={education.endDate}
                                    onChange={handleChange}
                                />
                            </label>
                        </div>
                    ))}
                </div>
                <button
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                    type="submit">Save</button>
            </form>
        </>
    );
};