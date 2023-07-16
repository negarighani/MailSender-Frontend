import React, {useState, useEffect} from 'react';
import Header from "../../components/Header";

function LetterCreation() {
    const [subject, setSubject] = useState('');
    const [content, setContent] = useState('');
    const [categories, setCategories] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState([]);

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const response = await fetch('http://localhost:8000/categories');
            const data = await response.json();
            setCategories(data);
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred while fetching categories');
        }
    };

    const handleAddCategory = (categoryId) => {
        if (selectedCategories.includes(categoryId)) {
            setSelectedCategories(selectedCategories.filter(category => category !== categoryId));
        } else {
            setSelectedCategories([...selectedCategories, categoryId]);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("subject", subject);
        formData.append("content", content);
        formData.append("categories", JSON.stringify(selectedCategories));

        // Send a POST request to the backend API to create a new letter
        try {
            const response = await fetch('http://localhost:8000/letters', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                console.log('Letter created successfully');
                alert('Letter created successfully!');
                setSubject('');
                setContent('');
                setSelectedCategories([]);
            } else {
                console.error('Failed to create letter');
                alert('Failed to create letter');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred while creating the letter');
        }
    };

    const handleClean = async (e) => {
        setSubject('');
        setContent('');
        setSelectedCategories([]);
    };

    return (
        <div className="body">
            <Header title="Letter Creation"/>
            <form onSubmit={handleSubmit}>
                <h4 className="message">Letter Info</h4>
                <input
                    type="text"
                    className="input-form"
                    placeholder="   Subject"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    required
                />
                <textarea
                    className="textarea_form textarea_form_edit"
                    placeholder="  Content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    required
                ></textarea>
                <label htmlFor="select-status">Letter Categories:</label>
                <select
                    className="select-status"
                    multiple
                    value={selectedCategories}
                    onChange={(e) => handleAddCategory(parseInt(e.target.value))}
                >
                    {categories.map(category => (
                        <option
                            key={category.id}
                            value={category.id}
                            style={{
                                backgroundColor: selectedCategories.includes(category.id) ? 'lightblue' : 'initial',
                                fontWeight: selectedCategories.includes(category.id) ? 'bold' : 'normal'
                            }}
                        >
                            {category.name}
                        </option>
                    ))}
                </select>

                <br/>
                <br/>
                <button className="button_Edit" type="submit">
                    Create Letter
                </button>
                <button className="button_Edit button_Edit_cancel" onClick={handleClean}>Clear</button>
            </form>
        </div>
    );
}

export default LetterCreation;
