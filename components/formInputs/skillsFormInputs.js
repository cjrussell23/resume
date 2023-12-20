import { FaTrash, FaPlusCircle } from 'react-icons/fa';

export default function SkillsFormInputs({ formData, setFormData }) {


    function changeSkill(event) {
        const { name, value } = event.target;
        const field = name.split('.')[2];
        const index = name.split('.')[1];
        if (field === 'subskills') {
            const subskillIndex = name.split('.')[3];
            setFormData({
                ...formData,
                skills: formData.skills.map((skill, i) => {
                    if (i === parseInt(index, 10)) {
                        return {
                            ...skill,
                            subskills: skill.subskills.map((subskill, j) => {
                                if (j === parseInt(subskillIndex, 10)) {
                                    return value;
                                }
                                return subskill;
                            }),
                        };
                    }
                    return skill;
                }),
            });
        }
        else {
            setFormData({
                ...formData,
                skills: formData.skills.map((skill, i) => {
                    if (i === parseInt(index, 10)) {
                        return {
                            ...skill,
                            [field]: value,
                        };
                    }
                    return skill;
                }),
            });
        }
    }


    function addSkill() {
        setFormData({
            ...formData,
            skills: [
                ...formData.skills,
                {
                    name: '',
                    subskills: [],
                }
            ],
        });
    }

    const addSubskill = (index) => () => {
        setFormData({
            ...formData,
            skills: formData.skills.map((skill, i) => {
                if (i === index) {
                    return {
                        ...skill,
                        subskills: [...skill.subskills, ''],
                    };
                }
                return skill;
            }),
        });
    }

    const removeSkill = (index) => () => {
        setFormData({
            ...formData,
            skills: formData.skills.filter((skill, i) => i !== index),
        });
    }

    const removeSubskill = (index, subskillIndex) => () => {
        setFormData({
            ...formData,
            skills: formData.skills.map((skill, i) => {
                if (i === index) {
                    return {
                        ...skill,
                        subskills: skill.subskills.filter((subskill, j) => j !== subskillIndex),
                    };
                }
                return skill;
            }),
        });
    }
    return (
        <div id='skills' className="border-2 border-gray-900 rounded w-full">
            <div className="flex items-center justify-between gap-4 bg-gray-900 p-4">
                <h2 className="text-2xl font-bold">Skills</h2>
                <button
                    className="text-green-500 hover:text-green-700"
                    type="button"
                    onClick={addSkill}

                >
                    {<FaPlusCircle />}
                </button>
            </div>
            {formData?.skills?.map((skill, index) => (
                <div key={index} className="flex flex-col gap-4 p-4 bg-gray-800 border-b-2 border-gray-900 w-full">
                    <div className="flex items-center justify-between">
                        <h3 className="text-xl font-bold">skill {index + 1}</h3>
                        <button
                            className="text-red-500 hover:text-red-700"
                            type="button"
                            onClick={removeSkill(index)}
                        >
                            {<FaTrash />}
                        </button>
                    </div>
                    <label className="flex flex-col">
                        <span className="text-xl font-bold">Name</span>
                        <input
                            className='p-2 rounded text-black'
                            type="text"
                            name={`skill.${index}.name`}
                            value={skill.name}
                            onChange={changeSkill}
                        />
                    </label>
                    <div className="flex flex-col border-2 border-gray-900">
                        <div className="flex items-center justify-between bg-gray-900 p-4">
                            <h2 className="text-2xl font-bold">Subskills</h2>
                            <button
                                className="text-green-500 hover:text-green-700"
                                type="button"
                                onClick={addSubskill(index)}

                            >
                                {<FaPlusCircle />}
                            </button>
                        </div>
                        <div className="flex items-center justify-center flex-wrap">
                            {skill?.subskills?.map((subskill, subskillIndex) => (
                                <div key={subskillIndex} className="flex flex-col gap-4 w-full bg-gray-700 p-4 border-b-2 border-gray-900">
                                    <div className="flex items-center justify-between">
                                        <h3 className="text-xl font-bold">Subskill {subskillIndex + 1}</h3>
                                        <button
                                            className="text-red-500 hover:text-red-700"
                                            type="button"
                                            onClick={removeSubskill(index, subskillIndex)}
                                        >
                                            {<FaTrash />}
                                        </button>
                                    </div>
                                    <label className="flex flex-col col-span-2">
                                        <input
                                            className='p-2 rounded text-black'
                                            type="text"
                                            name={`skill.${index}.subskills.${subskillIndex}`}
                                            value={subskill}
                                            onChange={changeSkill}
                                        />
                                    </label>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}