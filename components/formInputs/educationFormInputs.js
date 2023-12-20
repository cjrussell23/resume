import { FaTrash, FaPlusCircle } from 'react-icons/fa';

export default function EducationFormInputs({ formData, setFormData }) {

    function changeEducation(event) {
        const { name, value } = event.target;
        const field = name.split('.')[2];
        const index = name.split('.')[1];
        setFormData({
            ...formData,
            education: formData.education.map((education, i) => {
                if (i === parseInt(index, 10)) {
                    return {
                        ...education,
                        [field]: value,
                    };
                }
                return education;
            }),
        });
    }

    function addEducation() {
        setFormData({
            ...formData,
            education: [
                ...formData.education,
                {
                    institution: '',
                    area: '',
                    studyType: '',
                    startDate: '',
                    endDate: '',
                }
            ],
        });
    }

    function removeEducation(index) {
        return function() {
            setFormData({
                ...formData,
                education: formData.education.filter(function(education, i) {
                    return i !== index;
                }),
            });
        }
    }

    return (
        <div id='education' className="border-2 border-gray-900 rounded w-full">
            <div className="flex items-center justify-between gap-4 bg-gray-900 p-4">
                <h2 className="text-2xl font-bold">Education</h2>
                <button
                    className="text-green-500 hover:text-green-700"
                    type="button"
                    onClick={addEducation}

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
                            onClick={removeEducation(index)}
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
                            onChange={changeEducation}
                        />
                    </label>
                    <label className="flex flex-col">
                        <span className="text-xl font-bold">Area</span>
                        <input
                            className='p-2 rounded text-black'
                            type="text"
                            name={`education.${index}.area`}
                            value={education.area}
                            onChange={changeEducation}
                        />
                    </label>
                    <label className="flex flex-col">
                        <span className="text-xl font-bold">Study Type</span>
                        <input
                            className='p-2 rounded text-black'
                            type="text"
                            name={`education.${index}.studyType`}
                            value={education.studyType}
                            onChange={changeEducation}
                        />
                    </label>
                    <label className="flex flex-col">
                        <span className="text-xl font-bold">Start Date</span>
                        <input
                            className='p-2 rounded text-black'
                            type="date"
                            name={`education.${index}.startDate`}
                            value={education.startDate}
                            onChange={changeEducation}
                        />
                    </label>
                    <label className="flex flex-col">
                        <span className="text-xl font-bold">End Date</span>
                        <input
                            className='p-2 rounded text-black'
                            type="date"
                            name={`education.${index}.endDate`}
                            value={education.endDate}
                            onChange={changeEducation}
                        />
                    </label>
                </div>
            ))}
        </div>
    )
}
