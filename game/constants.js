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

const LIPSUM = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce bibendum commodo libero, "+
			"vel sagittis neque dictum nec. Sed ullamcorper vestibulum pulvinar. Integer et dapibus mauris. "+
			"Mauris sodales est et est ultricies, ut pulvinar justo feugiat. Integer gravida, odio sit amet "+
			"mattis scelerisque, ex ligula cursus lorem, vel feugiat enim eros fringilla purus. Praesent "+
			"malesuada mattis libero, in viverra orci condimentum in. Sed id ornare libero. Aenean vitae nisl "+
			"pharetra, consectetur arcu sit amet, pellentesque sapien. Phasellus quam dui, sagittis in sem sit "+
			"amet, iaculis luctus ligula. Donec a quam pharetra metus rutrum efficitur. Aliquam tortor magna, "+
			"sagittis ac sapien et, accumsan posuere nunc. Quisque aliquam lectus non feugiat finibus. In "+
			"scelerisque tortor vitae posuere elementum. Vestibulum sed fringilla sem. Quisque faucibus "+
			"imperdiet rutrum. Nullam sit amet rhoncus erat."+
			"Ut tempus est vitae lorem volutpat luctus. Sed varius sem quis ligula eleifend venenatis. "+
			"In semper mi vitae placerat volutpat. Morbi consectetur, risus quis egestas dictum, nibh "+
			"risus suscipit metus, ac feugiat diam mauris non tortor. Sed quam urna, imperdiet sit amet "+
			"ultrices quis, porta vitae mi. Vestibulum et nisl et felis tincidunt gravida. Ut aliquam "+
			"magna eget mi rutrum, in ornare mauris sollicitudin. Donec ullamcorper, magna ut tincidunt "+
			"fermentum, nibh arcu porta libero, sed commodo ligula arcu ut odio. Vestibulum ut euismod "+
			"diam. Praesent eget pellentesque turpis. In hac habitasse platea dictumst. Maecenas fringilla "+
			"velit et justo fringilla, sit amet dapibus risus congue. Maecenas diam enim, facilisis id posuere "+
			"sagittis, blandit non ipsum."+
			"Nunc faucibus dictum placerat. Vestibulum eu venenatis diam. Praesent tincidunt dolor ut ipsum "+
			"dapibus blandit. Pellentesque semper a tortor sed auctor. Vestibulum placerat nisl nibh, quis "+
			"dictum felis pretium a. Pellentesque habitant morbi tristique senectus et netus et malesuada fames "+
			"ac turpis egestas. Integer lacinia, purus sed iaculis dapibus, orci velit volutpat tellus, eget cursus "+
			"libero urna commodo ipsum. Donec luctus scelerisque neque, eget ornare nibh ultricies sed. Sed rhoncus "+
			"ut odio eget porttitor. Nulla finibus quam id laoreet ornare. Vestibulum porta consectetur ullamcorper. "+
			"Curabitur finibus leo lacus, sed facilisis neque auctor ut. Nunc a justo tincidunt, commodo massa a, "+
			"rutrum odio. Quisque imperdiet tristique quam, et vulputate ligula luctus nec. Curabitur ut vestibulum "+
			"tortor. Suspendisse augue purus, ornare ut accumsan sit amet, feugiat vel libero."+
			"Morbi vehicula at orci nec vestibulum. Sed lobortis sem ligula. Morbi eros lectus, finibus a nibh "+
			"eget, tincidunt ultricies justo. Pellentesque fringilla eget erat sed semper. Lorem ipsum dolor sit "+
			"amet, consectetur adipiscing elit. Aliquam id ante sit amet arcu ultricies tincidunt. Vestibulum ante "+
			"ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Fusce cursus orci vitae aliquet laoreet."+
			"Donec iaculis turpis at facilisis vehicula. Suspendisse potenti. Suspendisse convallis ac lectus "+
			"nec ultricies. Cras vitae neque sed erat bibendum auctor vel at nisl. In malesuada erat at odio "+
			"volutpat, ut faucibus turpis iaculis. Nullam eget imperdiet mauris. Morbi ultricies nisl justo. "+
			"Suspendisse augue turpis, convallis non posuere non, porttitor id nulla.";

var shotString = "";
var hitString = "";