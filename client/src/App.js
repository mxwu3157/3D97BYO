import { useState } from 'react'
function App() {
    const [invitee_name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [group_num, setNum] = useState("");
    const handleOnSubmit = async (e) => {
        alert("Sending "+JSON.stringify({ invitee_name, phone,group_num }));
        e.preventDefault();
        let result = await fetch(
        'http://localhost:5000/register', {
            method: "post",
            body: JSON.stringify({ invitee_name, phone,group_num }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        result = await result.json();
        console.warn(result);
        if (result) {
            alert("Data saved successfully");
            setPhone("");
            setName("");
            setNum("");
        }
    }
    return (
        <>
            <h1>Invitee Group Registration</h1>
            <form action="">
                <input type="text" placeholder="Invitee Name" style={{ margin: 20, padding: 10 , width:200}}
                value={invitee_name} onChange={(e) => setName(e.target.value)} />

                <input type="tel" placeholder="Phone Number" style={{ margin: 20, padding: 10  , width:200}}
                value={phone} onChange={(e) => setPhone(e.target.value)}
                pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                />

                <input type="Number" min="1" placeholder="Number of person in the group" style={{ margin: 20, padding: 10 , width:200 }}
                value={group_num} onChange={(e) => setNum(e.target.value)} />

                <button type="submit" style={{ margin: 20, padding: 10 , background:"green", color:'white'}}
                onClick={handleOnSubmit}>submit</button>
            </form>

        </>
    );
}

export default App;
