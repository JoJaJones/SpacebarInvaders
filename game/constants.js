const framesPerSecond = 60;
const GAME_WIDTH = 320;
const GAME_HEIGHT = 180;
const SCALE_MULTIPLIER = GAME_WIDTH/160;
const aspectRatio = GAME_WIDTH/GAME_HEIGHT;

const VERTICAL_VELOCITY = 2*SCALE_MULTIPLIER;
const HORIZONTAL_VELOCITY = 2*SCALE_MULTIPLIER;

const fontAspectRatio = 0.42;
const BACKGROUND_COLOR = "#524896";
const SHIP_OUTER_COLOR = "black";
const SHIP_INNER_COLOR = "white";
const LETTER_COLOR = "#ffc228";
const SHOT_COLOR = "#ff6186";


var shotString = "";
var hitString = "";