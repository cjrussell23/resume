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

export default function BasicsFormInputs({ formData, setFormData }) {

    function changeLocation(event) {
        const { name, value } = event.target;
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

    function changeProfile(event) {
        const { name, value } = event.target;
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

    const removeProfile = (index) => () => {
        setFormData({
            ...formData,
            basics: {
                ...formData.basics,
                profiles: formData.basics.profiles.filter((profile, i) => i !== index),
            },
        });
    }

    function addProfile() {
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

    function changeBasics(event) {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            basics: {
                ...formData.basics,
                [name]: value,
            },
        });
    }


    return (
        <div id='basics' className="flex gap-8 w-full flex-wrap">
            <div className="border-2 border-gray-900 rounded min-w-[600px] grow">
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
                            onChange={changeBasics}
                        />
                    </label>
                    <label className="flex flex-col">
                        <span className="text-xl font-bold">Label</span>
                        <input
                            className='p-2 rounded text-black'
                            type="text"
                            name="label"
                            value={formData.basics.label}
                            onChange={changeBasics}
                        />
                    </label>
                    <label className="flex flex-col">
                        <span className="text-xl font-bold">Email</span>
                        <input
                            className='p-2 rounded text-black'
                            type="text"
                            name="email"
                            value={formData.basics.email}
                            onChange={changeBasics}
                        />
                    </label>
                    <label className="flex flex-col">
                        <span className="text-xl font-bold">Phone</span>
                        <input
                            className='p-2 rounded text-black'
                            type="text"
                            name="phone"
                            value={formData.basics.phone}
                            onChange={changeBasics}
                        />
                    </label>
                    <label className="flex flex-col">
                        <span className="text-xl font-bold">URL</span>
                        <input
                            className='p-2 rounded text-black'
                            type="text"
                            name="url"
                            value={formData.basics.url}
                            onChange={changeBasics}
                        />
                    </label>
                    <label className="flex flex-col">
                        <span className="text-xl font-bold">Address</span>
                        <input
                            className='p-2 rounded text-black'
                            type="text"
                            name="location.address"
                            value={formData.basics?.location?.address}
                            onChange={changeLocation}
                        />
                    </label>
                    <label className="flex flex-col">
                        <span className="text-xl font-bold">Postal Code</span>
                        <input
                            className='p-2 rounded text-black'
                            type="text"
                            name="location.postalCode"
                            value={formData.basics?.location?.postalCode}
                            onChange={changeLocation}
                        />
                    </label>
                    <label className="flex flex-col">
                        <span className="text-xl font-bold">City</span>
                        <input
                            className='p-2 rounded text-black'
                            type="text"
                            name="location.city"
                            value={formData.basics.location.city}
                            onChange={changeLocation}
                        />
                    </label>
                    <label className="flex flex-col">
                        <span className="text-xl font-bold">Region</span>
                        <input
                            className='p-2 rounded text-black'
                            type="text"
                            name="location.region"
                            value={formData.basics.location.region}
                            onChange={changeLocation}
                        />
                    </label>
                    <label className="flex flex-col">
                        <span className="text-xl font-bold">Country</span>
                        <input
                            className='p-2 rounded text-black'
                            type="text"
                            name="location.country"
                            value={formData.basics.location.country}
                            onChange={changeLocation}
                        />
                    </label>
                    <label className="flex flex-col col-span-2">
                        <span className="text-xl font-bold">Summary</span>
                        {/* Resizable text box */}
                        <textarea
                            className='p-2 rounded text-black h-24'
                            name="summary"
                            value={formData.basics.summary}
                            onChange={changeBasics}
                        />
                    </label>
                </div>
            </div>
            <div
                className="border-2 border-gray-900 rounded min-w-[300px] grow">
                {/* Add profile button */}
                <div className="flex items-center justify-between gap-4 bg-gray-900 p-4">
                    <h2 className="text-2xl font-bold">Profiles</h2>
                    <button
                        className="text-green-500 hover:text-green-700"
                        type="button"
                        onClick={addProfile}

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
                                onChange={changeProfile}
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
                                onChange={changeProfile}
                            />
                        </label>
                        <label className="flex flex-col">
                            <span className="text-xl font-bold">URL</span>
                            <input
                                className='p-2 rounded text-black'
                                type="text"
                                name={`profiles.${index}.url`}
                                value={profile.url}
                                onChange={changeProfile}
                            />
                        </label>
                    </div>
                ))}
            </div>
        </div>
    )
}