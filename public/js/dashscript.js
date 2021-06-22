let isDashboard;
const checkURL = () => {
  let dashURL = window.location.href
  isDashboard = false;
  // let addBtns = document.querySelectorAll('.addToTrip')

  //  Check to see if on main dashboard
  if (dashURL === 'https://gear-wise.herokuapp.com/dashboard' || dashURL === 'https://gear-wise.herokuapp.com/dashboard/' || dashURL === 'http://localhost:3001/dashboard' || dashURL === 'http://localhost:3001/dashboard/') {
    isDashboard = true;
  }
  if (!isDashboard) {
    document.querySelector('#tripform').classList.add('hide');
    document.querySelector('#userinput').style.width = '100%';
    document.querySelector('.second-box').style.width = '150%';
    document.querySelector('#addtag').classList.add('show');
    document.querySelector('#edittag').classList.add('towhite');
    // document.querySelector('.gearitem').style.border = "1px solid green"
  } else {
    document.querySelector('.currentTripBox').classList.add('hide');
    document.querySelector('.tripLoadout').classList.add('hide');
    document.querySelector('#chartSize').classList.add('hide');
    document.querySelector('#myChart').classList.add('hide');
    document.querySelector('#trip-loadout-box').classList.add('hide');
    document.querySelector('.second-box').classList.add('hide');
  }
  // If there aren't any items in trip loadout, don't show the chart yet.
  if (!document.querySelector('.tripItem')) {
    document.querySelector('#myChart').classList.add('hide');
  }


  // WORKING ON NEW TRIP LINK
  const newTrip = document.querySelectorAll('.new-trip')
  if (newTrip) {
    if (isDashboard) {
      newTrip.forEach(link => {
        link.addEventListener('click', () => {
          window.scrollTo(0, document.body.scrollHeight);
        })
        // link.classList.add('hide');
      })
    } else {
      newTrip.forEach(link => {
        link.addEventListener('click', async () => {
          window.location.replace('/dashboard');
        //   function Scrolldown() {
        //     window.scroll(0, 300);
        //   }

        //   window.onload = Scrolldown;
        })
      })
    }
  }
}

// Adds icons to gear closet items based on category
const addIcons = () => {
  const icons = document.querySelectorAll('#genname');
  if (icons) {
    icons.forEach(icon => {
      switch (icon.textContent) {
        case 'Shelter':
          icon.innerHTML = '<i class="fas fa-campground"></i>'
          break;
        case 'Sleep System':
          icon.innerHTML = '<i class="fas fa-bed"></i>'
          break;
        case 'Clothing':
          icon.innerHTML = '<i class="fas fa-tshirt"></i>'
          break;
        case 'Cooking/Hydration':
          icon.innerHTML = '<i class="fas fa-hand-holding-water"></i>'
          break;
        case 'Safety/Navigation':
          icon.innerHTML = '<i class="fas fa-compass"></i>'
          break;
        case 'Hygeine':
          icon.innerHTML = '<i class="fas fa-soap"></i>'
          break;
        case 'Electronics':
          icon.innerHTML = '<i class="fas fa-mobile"></i>'
          break;
        case 'Miscellaneous':
          icon.innerHTML = '<i class="fas fa-box-open"></i>'
          break;

      }
    })
  }

}

const addTipText = () => {
  const tripLoadout = document.querySelector('#trip-loadout-box');
  const tripText = document.createElement('div')
  tripText.classList.add('tip-text');

  const hasChild = tripLoadout.hasChildNodes();

  tripText.textContent = "Click on an item in your Gear Closet to add to trip!";
  console.log(hasChild)

  if (!hasChild) {
    tripLoadout.append(tripText);
  } else {
    return;
  }

}

checkURL();
addIcons();
addTipText();


// When item is chosen from gear bank, it will populate spot on current trip gear list
const addToTrip = (e) => {
  const currentItemId = e.target.dataset.id;

  let dashURL = window.location.href
  let isDashboard = false;

  //  Check to see if on main dashboard
  if (dashURL === 'https://gear-wise.herokuapp.com/dashboard' || dashURL === 'https://gear-wise.herokuapp.com/dashboard/' || dashURL === 'http://localhost:3001/dashboard' || dashURL === 'http://localhost:3001/dashboard/') {
    isDashboard = true;
  }
  // Grabs currently loaded trip ID
  let currTripId = document.querySelector('.currentTripBox').dataset.id

  // If on dashboard, alerts that no trip to add item to
  if (isDashboard === true) {
    updateGearForm(currentItemId);
    return;
  }
  //  Upates gear item to that trip on page NOT WORKING
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({
    "id": currTripId
  });

  var requestOptions = {
    method: 'PUT',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };

  fetch(`/api/gear/${currentItemId}`, requestOptions)
    .then(res => {
      if (res.ok) {
        location.reload()
      }
    })
    .catch(error => console.log('error', error));
  location.reload();

}

const updateGearForm = (itemID) => {
  const categories = document.getElementById('categories');
  const item = document.getElementById('item');
  const description = document.getElementById('description');
  const weight = document.getElementById('weight');
  const price = document.getElementById('price');
  const gearBtn = document.querySelector('.closet-button-div');

  fetch(`/api/gear/${itemID}`, { method: "get" })
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      categories.value = data.general_name;
      item.value = data.product_name;
      description.value = data.description;
      weight.value = data.weight_oz;
      price.value = data.price;
    })
  let newButton = `<button class="mybtn updater-button" data-id=${itemID}>Update Item</button>`;
  gearBtn.innerHTML = newButton;

}


// this will find the parent gear element and fetch request to remove it from API
const deleteItem = (e) => {

  const gearId = e.currentTarget.dataset.id;

  if (confirm('Are you sure you want to delete this? You cannot undo this action.')) {
    fetch(`/api/gear/${gearId}`, {
      method: 'DELETE',
      headers: {
        "Content-Type": "application/json"
      }
    }).then(res => {
      if (res.ok) {
        location.reload();
      } else {
        alert("unable to process request")
        console.log(res);
      }
    })
  } else {
    return false;
  }
}

const removeItem = (e) => {
  e.stopPropagation();

  let currTripId = document.querySelector('.currentTripBox').dataset.id

  const gearId = e.target.dataset.id;

  console.log(gearId);

  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({
    "id": gearId
  });

  var requestOptions = {
    method: 'PUT',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };

  fetch(`/api/trips/${currTripId}`, requestOptions)
    // .then(response => response.json.text())
    .then(res => {
      console.log(res);
      if (res.ok) {
        location.reload()
      }
    })
    .catch(error => console.log('error', error));
  location.reload();

}

// Add a trip form with fetch req to server
document.querySelector("#tripForm").addEventListener("submit", event => {
  console.log('trip submitted');
  const dateToFix = document.querySelector("#startingdate").value
  console.log(dateToFix);

  event.preventDefault();
  const fetchObj = {
    name: document.querySelector("#name").value,
    location: document.querySelector("#location").value,
    description: document.querySelector("#tripdescription").value,
    starting_date: document.querySelector("#startingdate").value,
    ending_date: document.querySelector("#endingdate").value,
    distance_mi: document.querySelector("#distance").value
  }
  console.log(fetchObj);
  fetch("/api/trips", {
    method: "POST",
    body: JSON.stringify(fetchObj),
    headers: {
      "Content-Type": "application/json"
    }
  }).then(res => {
    if (res.ok) {
      location.reload();
    } else {
      alert("couldn't add trip!")
      location.redirect(`/dashboard/${res.id}`);
      console.log(res);
    }
  })
})

// Add a gear item to gear bank through this form
document.querySelector("#bag").addEventListener("submit", event => {
  const updateBtn = document.querySelector('.updater-button')

  if (updateBtn) {
    console.log('update function reached');

    const itemID = updateBtn.getAttribute("data-id");
    const categories = document.getElementById('categories').value;
    const item = document.getElementById('item').value;
    const description = document.getElementById('description').value;
    const weight = document.getElementById('weight').value;
    const price = document.getElementById('price').value;
    const gearBtn = document.querySelector('.closet-button-div');
    fetch(`api/gear/update/${itemID}`, {
      method: "PUT",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        categories, item, description, weight, price
      })
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        categories.value = "";
        item.value = "";
        description.value = "";
        weight.value = "";
        price.value = "";

        let newButton = `<button class="btn closet-button">Add to Closet</button>`;
        gearBtn.innerHTML = newButton;
        location.reload()
      })
      .catch(function (err) {
        console.log("Fetch Error :-S", err);
      });
  } else {
    console.log('form submitted');

    event.preventDefault();
    const fetchObj = {
      general_name: document.querySelector("#categories").value,
      product_name: document.querySelector("#item").value,
      description: document.querySelector("#description").value,
      weight_oz: document.querySelector("#weight").value,
      price: document.querySelector("#price").value,
    }
    fetch("/api/gear", {
      method: "POST",
      body: JSON.stringify(fetchObj),
      headers: {
        "Content-Type": "application/json"
      }
    }).then(res => {
      if (res.ok) {
        location.reload();
      } else {
        alert("couldn't add item!")
        location.reload();
        console.log(res);
      }
    })
  }
})



const deletebtn = document.querySelectorAll('.close');

if (deletebtn) {
  for (const btn of deletebtn) {
    btn.addEventListener('click', (event) => {
      deleteItem(event)
    })
  }
}

document.querySelector(".gear-bank").addEventListener("click", (event) => {
  if (event.target.className.indexOf("addToTrip") > -1) {
    addToTrip(event);
  }
});


const removeBtn = document.querySelectorAll(".removebtn");

if (removeBtn) {
  for (const btn of removeBtn) {
    btn.addEventListener("click", (event) => {
      console.log('clicked');
      removeItem(event);

    });

  }

}

