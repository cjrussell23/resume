import { FaPlusCircle, FaTrash } from 'react-icons/fa';


export default function ProjectsFormInputs({ formData, setFormData }) {

    function changeProject(event) {
        const { name, value } = event.target;
        const field = name.split('.')[2];
        const index = name.split('.')[1];
        if (field === 'highlights') {
            const highlightIndex = name.split('.')[3];
            console.log(field, index, highlightIndex);
            setFormData({
                ...formData,
                projects: formData.projects.map((project, i) => {
                    if (i === parseInt(index, 10)) {
                        return {
                            ...project,
                            highlights: project.highlights.map((highlight, j) => {
                                if (j === parseInt(highlightIndex, 10)) {
                                    return value;
                                }
                                return highlight;
                            }),
                        };
                    }
                    return project;
                }),
            });
        }
        else if (field === 'technologies') {
            const technologyIndex = name.split('.')[3];
            setFormData({
                ...formData,
                projects: formData.projects.map((project, i) => {
                    if (i === parseInt(index, 10)) {
                        return {
                            ...project,
                            technologies: project.technologies.map((technology, j) => {
                                if (j === parseInt(technologyIndex, 10)) {
                                    return value;
                                }
                                return technology;
                            }),
                        };
                    }
                    return project;
                }),
            });
        }
        else {
            setFormData({
                ...formData,
                projects: formData.projects.map((project, i) => {
                    if (i === parseInt(index, 10)) {
                        return {
                            ...project,
                            [field]: value,
                        };
                    }
                    return project;
                }),
            });
        }
    }

    function addProject() {
        setFormData({
            ...formData,
            projects: [
                ...formData.projects,
                {
                    name: '',
                    description: '',
                    highlights: [],
                    startDate: '',
                    endDate: '',
                    url: '',
                    github: '',
                    technologies: [],
                }
            ],
        });
    }

    function addHighlight(index) {
        return function() {
            setFormData({
                ...formData,
                projects: formData.projects.map(function(project, i) {
                    if (i === index) {
                        return {
                            ...project,
                            highlights: [...project.highlights, ''],
                        };
                    }
                    return project;
                }),
            });
        }
    }

    function removehighlight(index, highlightIndex) {
        return function() {
            setFormData({
                ...formData,
                projects: formData.projects.map(function(project, i) {
                    if (i === index) {
                        return {
                            ...project,
                            highlights: project.highlights.filter(function(highlight, j) {
                                return j !== highlightIndex;
                            }),
                        };
                    }
                    return project;
                }),
            });
        }
    }

    function addTechnology(index) {
        return function() {
            setFormData({
                ...formData,
                projects: formData.projects.map(function(project, i) {
                    if (i === index) {
                        return {
                            ...project,
                            technologies: [...project.technologies, ''],
                        };
                    }
                    return project;
                }),
            });
        }
    }

    function removeTechnology(index, technologyIndex) {
        return function() {
            setFormData({
                ...formData,
                projects: formData.projects.map(function(project, i) {
                    if (i === index) {
                        return {
                            ...project,
                            technologies: project.technologies.filter(function(technology, j) {
                                return j !== technologyIndex;
                            }),
                        };
                    }
                    return project;
                }),
            });
        }
    }

    function removeproject(index) {
        return function() {
            setFormData({
                ...formData,
                projects: formData.projects.filter(function(project, i) {
                    return i !== index;
                }),
            });
        }
    }

    return (
        <div id='project' className="border-2 border-gray-900 rounded w-full">
            <div className="flex items-center justify-between gap-4 bg-gray-900 p-4">
                <h2 className="text-2xl font-bold">Projects</h2>
                <button
                    className="text-green-500 hover:text-green-700"
                    type="button"
                    onClick={addProject}

                >
                    {<FaPlusCircle />}
                </button>
            </div>
            {formData?.projects?.map((project, index) => (
                <div key={index} className="flex flex-col gap-4 p-4 bg-gray-800 border-b-2 border-gray-900 w-full">
                    <div className="flex items-center justify-between">
                        <h3 className="text-xl font-bold">project {index + 1}</h3>
                        <button
                            className="text-red-500 hover:text-red-700"
                            type="button"
                            onClick={removeproject(index)}
                        >
                            {<FaTrash />}
                        </button>
                    </div>
                    <label className="flex flex-col">
                        <span className="text-xl font-bold">Name</span>
                        <input
                            className='p-2 rounded text-black'
                            type="text"
                            name={`project.${index}.name`}
                            value={project.name}
                            onChange={changeProject}
                        />
                    </label>
                    <label className="flex flex-col">
                        <span className="text-xl font-bold">Description</span>
                        <input
                            className='p-2 rounded text-black'
                            type="text"
                            name={`project.${index}.description`}
                            value={project.description}
                            onChange={changeProject}
                        />
                    </label>
                    <label className="flex flex-col">
                        <span className="text-xl font-bold">Start Date</span>
                        <input
                            className='p-2 rounded text-black'
                            type="text"
                            name={`project.${index}.startDate`}
                            value={project.startDate}
                            onChange={changeProject}
                        />
                    </label>
                    <label className="flex flex-col">
                        <span className="text-xl font-bold">End Date</span>
                        <input
                            className='p-2 rounded text-black'
                            type="text"
                            name={`project.${index}.endDate`}
                            value={project.endDate}
                            onChange={changeProject}
                        />
                    </label>
                    <label className="flex flex-col">
                        <span className="text-xl font-bold">URL</span>
                        <input
                            className='p-2 rounded text-black'
                            type="text"
                            name={`project.${index}.url`}
                            value={project.url}
                            onChange={changeProject}
                        />
                    </label>
                    <label className="flex flex-col">
                        <span className="text-xl font-bold">Github</span>
                        <input
                            className='p-2 rounded text-black'
                            type="text"
                            name={`project.${index}.github`}
                            value={project.github}
                            onChange={changeProject}
                        />
                    </label>
                    <div className="flex flex-col border-2 border-gray-900">
                        <div className="flex items-center justify-between bg-gray-900 p-4">
                            <h2 className="text-2xl font-bold">Highlights</h2>
                            <button
                                className="text-green-500 hover:text-green-700"
                                type="button"
                                onClick={addHighlight(index)}

                            >
                                {<FaPlusCircle />}
                            </button>
                        </div>
                        <div className="flex items-center justify-center flex-wrap">
                            {project?.highlights?.map((highlight, highlightIndex) => (
                                <div key={highlightIndex} className="flex flex-col gap-4 w-full bg-gray-700 p-4 border-b-2 border-gray-900">
                                    <div className="flex items-center justify-between">
                                        <h3 className="text-xl font-bold">highlight {highlightIndex + 1}</h3>
                                        <button
                                            className="text-red-500 hover:text-red-700"
                                            type="button"
                                            onClick={removehighlight(index, highlightIndex)}
                                        >
                                            {<FaTrash />}
                                        </button>
                                    </div>
                                    <label className="flex flex-col col-span-2">
                                        <input
                                            className='p-2 rounded text-black'
                                            type="text"
                                            name={`project.${index}.highlights.${highlightIndex}`}
                                            value={highlight}
                                            onChange={changeProject}
                                        />
                                    </label>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="flex flex-col border-2 border-gray-900">
                        <div className="flex items-center justify-between bg-gray-900 p-4">
                            <h2 className="text-2xl font-bold">Technologies</h2>
                            <button
                                className="text-green-500 hover:text-green-700"
                                type="button"
                                onClick={addTechnology(index)}

                            >
                                {<FaPlusCircle />}
                            </button>
                        </div>
                        <div className="flex items-center justify-center flex-wrap">
                            {project?.technologies?.map((technology, technologyIndex) => (
                                <div key={technologyIndex} className="flex flex-col gap-4 w-full bg-gray-700 p-4 border-b-2 border-gray-900">
                                    <div className="flex items-center justify-between">
                                        <h3 className="text-xl font-bold">Technology {technologyIndex + 1}</h3>
                                        <button
                                            className="text-red-500 hover:text-red-700"
                                            type="button"
                                            onClick={removeTechnology(index, technologyIndex)}
                                        >
                                            {<FaTrash />}
                                        </button>
                                    </div>
                                    <label className="flex flex-col col-span-2">
                                        <input
                                            className='p-2 rounded text-black'
                                            type="text"
                                            name={`project.${index}.technologies.${technologyIndex}`}
                                            value={technology}
                                            onChange={changeProject}
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