const express = require("express");
const router = express.Router();
const apiAuth = require("../middleware/apiAuth");
const { User, GearItem, Trip } = require("../models");

router.get("/", async (req, res) => {
  res.render("index");
});

// Loads the dashboard with the user's data displayed
router.get("/dashboard", apiAuth, async (req, res) => {
  try {
    const userGearData = await GearItem.findAll({
      where: {
        user_id: req.session.user.id,
      },
    });
    if (!req.session.user) {
      res.render("index");
      return;
    }
    const userGear = userGearData.map((gear) => gear.get({ plain: true }));
    userGear.sort(
      (gear1, gear2) => Number(gear2.weight_oz) - Number(gear1.weight_oz)
    );
    userGear.username = req.session.user.username;
    res.render("dashboard", { userGear });
  } catch (err) {
    res.json(err);
  }
});

// Load specific trip data to add loadouts
router.get("/dashboard/:id", apiAuth, async (req, res) => {
  // try {
  const userGearData = await GearItem.findAll({
    where: {
      user_id: req.session.user.id,
    },
  });
  const currTripData = await Trip.findByPk(req.params.id, {
    include: [{ model: GearItem }],
  });
  const userGear = userGearData.map((gear) => gear.get({ plain: true }));
  const currTrip = currTripData.get({ plain: true });
  userGear.username = req.session.user.username;

  res.render("dashboard", { userGear, currTrip });
  // } catch (err) {
  //   res.json(err);
  // }
});

// For trips page, will display the trips that the user has
router.get("/trips", apiAuth, async (req, res) => {
  try {
    const userTripData = await Trip.findAll(
      {
        where: {
          user_id: req.session.user.id,
        },
      },
      {
        include: [{ model: GearItem }],
      }
    );
    const userTrips = userTripData.map((Trip) => Trip.get({ plain: true }));

    res.render("trips", { userTrips });
  } catch (err) {
    res.json(err);
  }
});

module.exports = router;
