# Dota Hero Showcase API Documentation
The API provides information about the hero information based on the game Dota.

## Get the list of hero names by a specified hero type.
**Request Format:** dota.php?type={type}

**Request Type:** GET

**Returned Data Format**: Plain Text

**Description:** Return a list of specified hero type in a format of {Name}:{Localized Name}
The valid types are `str`, `agi`, `int`.s

**Example Request:** dota.php?type=agi

**Example Response:**
*Fill in example response in the {}*
```s
antimage:Anti-Mage
arc_warden:Arc Warden
bloodseeker:Bloodseeker
bounty_hunter:Bounty Hunter
broodmother:Broodmother
clinkz:Clinkz
...
```

**Error Handling:**
 - if the `type` are not either `str`, `agi`, or `int`, then it will return 400 error with a message: `No heroes found, there are only three valid types: \"str\", \"agi\", \"int\"`.

## Filter heroes by roles
**Request Format:** dota.php?roles={role1}|{role2}|...|{rolen}

**Request Type**: GET

**Returned Data Format**: JSON

**Description:** Return a list of heroes that shares all of the attributes provided by the request.

**Example Request:** dota.php?roles=carry|disabler|escape

**Example Response:**

```json
[
  "mirana",
  "morphling",
  "storm_spirit",
  "windrunner",
  "slardar",
  "riki",
  "faceless_void",
  "life_stealer",
  "spirit_breaker",
  "invoker",
  "meepo",
  "naga_siren",
  "slark",
  "ember_spirit",
  "monkey_king",
  "pangolier"
]
```

**Error Handling:**
 - If the request filters out all heroes or the role doesn't exist in any heroes, it will return a black JSON that is useful to unfilter all in Javascript