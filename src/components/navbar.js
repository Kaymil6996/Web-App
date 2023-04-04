import React, { useState, useEffect } from "react";
import "./navbar.css";
import axios from 'axios';
const Navbar = () => {

  const [burger_class, setBurgerClass] = useState("burger-bar unclicked");
  const [menu_class, setMenuClass] = useState("menu hidden");
  const [isMenuClicked, setIsMenuClicked] = useState(false);
  const [data, setData] = useState([]);

  const fetchData = async () => {
    const result = await axios.get('http://localhost:2137');
    setData(result.data);
    console.log(data)
  }

  useEffect(() => {
    fetchData()
    
  }, [])

  const updateMenu = () => {
    if (!isMenuClicked) {
      setBurgerClass("burger-bar clicked");
      setMenuClass("menu visible");
    } else {
      setBurgerClass("burger-bar unclicked");
      setMenuClass("menu hidden");
    }
    setIsMenuClicked(!isMenuClicked);
  };

  const [email, setEmail] = useState("");
  const [haslo, setHaslo] = useState("");

  const [newemail, setNewEmail] = useState("");
  const [newhaslo, setNewHaslo] = useState("");

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const newhandleEmail = (e) => {
    setNewEmail(e.target.value);
  };

  const handleInputChange = (e) => {
    setHaslo(e.target.value);
  };

  const handleInputChangeNew = (e) => {
    setNewHaslo(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault(e.target.value);

    setEmail("");
    setHaslo("");

    const newdata = [
      ...data,
      { email: email, haslo: haslo },
    ];
    axios.post('http://localhost:2137/add',{
      email:email,
      haslo:haslo
    })
    setData(newdata);
    
    
    
  };

  useEffect(() => {
    fetchData()
    
  }, [])


  function deleteUser(id) {
    const newdata = data.filter((item) => item.id !== id);
    axios.delete(`http://localhost:2137/delete/${id}`)
    setData(newdata);
    
    
  }

  const updatedata = async (id) => {

    const newdata = data.map((item) => {
      if (item.id === id) {
        return { ...item, email: newemail , haslo: newhaslo  };
      }
      return item;
    });
    axios.put(`http://localhost:2137/update/${id}`,{
      email:newemail,
      haslo:newhaslo
    })
    setData(newdata);
  }

  return (
    <div style={{}}>
      <nav>
        <div className="burger-menu" onClick={updateMenu}>
          <div className={burger_class}></div>
          <div className={burger_class}></div>
          <div className={burger_class}></div>
        </div>
      </nav>

      <div className={menu_class}>
        <form>
          <div class="subtitle">Zarejestruj się!</div>
          <div class="input-container ic1">
            <input
              id="firstname"
              class="input"
              type="text"
              placeholder=" "
              value={email}
              onChange={handleEmail}
            />
            <div class="cut"></div>
            <label for="firstname" class="placeholder">
              Email
            </label>
          </div>
          <div class="input-container ic2">
            <input
              id="lastname"
              class="input"
              type="password"
              placeholder=" "
              value={haslo}
              onChange={handleInputChange}
            />
            <div class="cut"></div>
            <label for="lastname" class="placeholder">
              Hasło
            </label>
          </div>

          <button type="text" class="submit" onClick={(e) => {

            handleSubmit(e)
          }}>
            submit
          </button>
        </form>

        <form>
          <div class="subtitle">Zmień Email i hasło!</div>
          <div class="input-container ic1">
            <input
              id="firstname"
              class="input"
              type="text"
              placeholder=" "
              value={newemail}
              onChange={newhandleEmail}
            />
            <div class="cut"></div>
            <label for="firstname" class="placeholder">
              Email
            </label>
          </div>
          <div class="input-container ic2">
            <input
              id="lastname"
              class="input"
              type="password"
              placeholder=" "
              value={newhaslo}
              onChange={handleInputChangeNew}
            />
            <div class="cut"></div>
            <label for="lastname" class="placeholder">
              Hasło
            </label>
          </div>

         
        </form>

        <div
          class="Data"
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "550px",
            float: "center",
          }}
        >
          {data.map((item) => {
            return (
              <div key={item.id}>
                <div class="email">Email: {item.email}</div>
                <div class="haslo">Hasło: {item.haslo}</div>
                <button class="delete" onClick={() => deleteUser(item.id)}>
                  Usuń
                </button>
                <button class="delete" onClick={() => updatedata(item.id)}>
                  Zmień
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
