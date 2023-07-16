import React, { useEffect, useState } from 'react';
import '../style.css';
import Header from "../../components/Header";

function UserRegistration() {
    const [email, setEmail] = useState('');
    const [time, setTime] = useState('past_minute');
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
        formData.append("email", email);
        formData.append("categories", JSON.stringify(selectedCategories));
        formData.append("time", time);

        try {
            const response = await fetch("http://localhost:8000/users", {
                method: "POST",
                body: formData,
            });

            if (response.ok) {
                // User registered successfully
                const addedUser = await response.json();
                console.log(addedUser)
                alert("User registered successfully!");
                setEmail("");
                setSelectedCategories([]);
            } else if (response.status === 409) {
                // Email already exists
                alert("Email already exists");
            } else {
                // Other error occurred
                console.error("Failed to register user");
                alert("Failed to register user");
            }
        } catch (error) {
            console.error("Error:", error);
            alert("An error occurred while registering the user");
        }
    };

    const handleClean = async (e) => {
        setEmail("");
        setSelectedCategories([]);
    };

    return (
        <div className="body">
            <Header title="User Register" />
            <form onSubmit={handleSubmit}>
                <h4 className="message">User Info</h4>
                <input
                    className="input-form"
                    placeholder="   Email"
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />

                <label htmlFor="select-status">Your Interests:</label>
                <select
                    className="select-status"
                    multiple
                    value={selectedCategories}
                    onChange={(e) => handleAddCategory(parseInt(e.target.value))}
                    required
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
                <label for="select-time">Receive Emails From:</label>
                <select
                    className="select-time"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    required
                >
                    <option value="past_minute" >
                        Past Minute
                    </option>
                    <option value="past_hour" >
                        Past Hour
                    </option>
                    <option value="past_day" >
                        Past Day
                    </option>
                    <option value="past_month" >
                        Past Month
                    </option>
                </select>
                <br/>
                <br/>
                <button className="button_Edit" type="submit">
                    Register
                </button>
                <button className="button_Edit button_Edit_cancel" onClick={handleClean}>Clear</button>
            </form>
        </div>
    );
}

export default UserRegistration;
