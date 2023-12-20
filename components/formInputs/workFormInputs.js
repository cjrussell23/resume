import { FaTrash, FaPlusCircle } from 'react-icons/fa';

export default function WorkFormInputs({ formData, setFormData }) {

    function changeWork(event) {
        const { name, value } = event.target;
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

    function addWork() {
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

    function removeWork(index) {
        return function() {
            setFormData({
                ...formData,
                work: formData.work.filter(function(job, i) {
                    return i !== index;
                }),
            });
        }
    }

    function removeWorkHighlight(index, highlightIndex) {
        return function() {
            setFormData({
                ...formData,
                work: formData.work.map(function(job, i) {
                    if (i === index) {
                        return {
                            ...job,
                            highlights: job.highlights.filter(function(highlight, j) {
                                return j !== highlightIndex;
                            }),
                        };
                    }
                    return job;
                }),
            });
        }
    }

    function addWorkHighlight(index) {
        return function() {
            setFormData({
                ...formData,
                work: formData.work.map(function(job, i) {
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
    }
    return (
        <div id='work' className="border-2 border-gray-900 rounded w-full">
            <div className="flex items-center justify-between gap-4 bg-gray-900 p-4">
                <h2 className="text-2xl font-bold">Work</h2>
                <button
                    className="text-green-500 hover:text-green-700"
                    type="button"
                    onClick={addWork}

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
                            onChange={changeWork}
                        />
                    </label>
                    <label className="flex flex-col">
                        <span className="text-xl font-bold">Position</span>
                        <input
                            className='p-2 rounded text-black'
                            type="text"
                            name={`work.${index}.position`}
                            value={job.position}
                            onChange={changeWork}
                        />
                    </label>
                    <label className="flex flex-col">
                        <span className="text-xl font-bold">Website</span>
                        <input
                            className='p-2 rounded text-black'
                            type="text"
                            name={`work.${index}.website`}
                            value={job.website}
                            onChange={changeWork}
                        />
                    </label>
                    <label className="flex flex-col">
                        <span className="text-xl font-bold">Start Date</span>
                        <input
                            className='p-2 rounded text-black'
                            type="date"
                            name={`work.${index}.startDate`}
                            value={job.startDate}
                            onChange={changeWork}
                        />
                    </label>
                    <label className="flex flex-col">
                        <span className="text-xl font-bold">End Date</span>
                        <input
                            className='p-2 rounded text-black'
                            type="date"
                            name={`work.${index}.endDate`}
                            value={job.endDate}
                            onChange={changeWork}
                        />
                    </label>
                    <label className="flex flex-col col-span-2">
                        <span className="text-xl font-bold">Summary</span>
                        {/* Resizable text box */}
                        <textarea
                            className='p-2 rounded text-black h-24'
                            name={`work.${index}.summary`}
                            value={job.summary}
                            onChange={changeWork}
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
                                            onChange={changeWork}
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