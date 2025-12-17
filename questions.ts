import { Question } from './types';

// The first 15 authentic questions
const BASE_QUESTIONS: Question[] = [
  {
    id: 1,
    text: "The inside rear-view mirror should be adjusted to show the:",
    options: [
      { key: 'a', text: "center of the road behind the vehicle." },
      { key: 'b', text: "left side of the road behind the vehicle." },
      { key: 'c', text: "right side of the road behind the vehicle." },
    ],
    correctAnswer: 'a'
  },
  {
    id: 2,
    text: "As the speed of a vehicle doubles, its destructive power in a crash:",
    options: [
      { key: 'a', text: "also doubles." },
      { key: 'b', text: "triples." },
      { key: 'c', text: "increases by four times." },
    ],
    correctAnswer: 'c'
  },
  {
    id: 3,
    text: "When approaching a person crossing the street who is carrying a white cane or using a guide dog, you should:",
    options: [
      { key: 'a', text: "continue forward but be prepared to stop." },
      { key: 'b', text: "stop and yield the right-of-way." },
      { key: 'c', text: "honk your vehicle's horn and continue slowly." },
    ],
    correctAnswer: 'b'
  },
  {
    id: 4,
    text: "The first thing to do if the vehicle in front of you signals or flashes its brake lights is to:",
    options: [
      { key: 'a', text: "slow down." },
      { key: 'b', text: "change lanes." },
      { key: 'c', text: "move slightly to the left." },
    ],
    correctAnswer: 'a'
  },
  {
    id: 5,
    text: "When passing a vehicle on a two-lane road, you should return to the right side of the road when:",
    options: [
      { key: 'a', text: "you can see both headlights of the passed vehicle in your rear-view mirror." },
      { key: 'b', text: "the other driver signals you to do so." },
      { key: 'c', text: "you clear the front bumper of the passed vehicle by at least 50 feet." },
    ],
    correctAnswer: 'a'
  },
  {
    id: 6,
    text: "Drivers must always keep in mind that:",
    options: [
      { key: 'a', text: "their driving can be affected by emotional factors." },
      { key: 'b', text: "their driving will affect their physical condition." },
      { key: 'c', text: "emotional factors have little effect on their driving." },
    ],
    correctAnswer: 'a'
  },
  {
    id: 7,
    text: "Car 1 is leaving the expressway. What hazard is the driver most likely to encounter?",
    options: [
      { key: 'a', text: "strong wind on the overpass." },
      { key: 'b', text: "sharp curve on the exit ramp." },
      { key: 'c', text: "a tail-end crash with Car 2." },
    ],
    correctAnswer: 'b',
    hasDiagram: true,
    diagramType: 'exit_ramp'
  },
  {
    id: 8,
    text: "If a passing vehicle has to cut closely in front of you to avoid oncoming traffic, you should:",
    options: [
      { key: 'a', text: "slow down and check the shoulder." },
      { key: 'b', text: "pull off the road as soon as possible." },
      { key: 'c', text: "steer toward the left side of the road." },
    ],
    correctAnswer: 'a'
  },
  {
    id: 9,
    text: "When approaching a freeway entrance ramp on your right, you can make it easier for vehicles entering the freeway you are on by:",
    options: [
      { key: 'a', text: "flashing your vehicle's headlights to alert the other driver that you are approaching." },
      { key: 'b', text: "maintaining your speed and staying in the right-hand lane." },
      { key: 'c', text: "moving to your left to create a gap for the entering traffic." },
    ],
    correctAnswer: 'c'
  },
  {
    id: 10,
    text: "When all or part of a highway traffic lane is closed for construction, maintenance, or surveying, the speed limit is:",
    options: [
      { key: 'a', text: "35 MPH, unless posted otherwise." },
      { key: 'b', text: "45 MPH, unless posted otherwise." },
      { key: 'c', text: "55 MPH, unless posted otherwise." },
    ],
    correctAnswer: 'b'
  },
  {
    id: 11,
    text: "One alcoholic drink such as a bottle of beer or a glass of wine:",
    options: [
      { key: 'a', text: "will improve your judgment and reaction time." },
      { key: 'b', text: "can decrease your ability to operate motor vehicles." },
      { key: 'c', text: "has no effect on your ability to operate motor vehicles." },
    ],
    correctAnswer: 'b'
  },
  {
    id: 12,
    text: "While backing a car, you should see clearly in the direction your car is moving. What is the BEST way to do this?",
    options: [
      { key: 'a', text: "turn your head and shoulders and look backward." },
      { key: 'b', text: "use both the inside rear-view and outside rear-view mirrors as needed." },
      { key: 'c', text: "use the inside rear-view mirror, moving your eyes as needed to see better." },
    ],
    correctAnswer: 'a'
  },
  {
    id: 13,
    text: "When the brake system warning light stays on after you have shifted to Drive, you should FIRST:",
    options: [
      { key: 'a', text: "pump the brakes to release a sticking brake shoe." },
      { key: 'b', text: "check to make sure the parking brake is released." },
      { key: 'c', text: "stop at the nearest service station to have the brake fluid checked." },
    ],
    correctAnswer: 'b'
  },
  {
    id: 14,
    text: "This center pavement line (solid yellow next to broken yellow) means:",
    options: [
      { key: 'a', text: "pass on the right." },
      { key: 'b', text: "no passing allowed." },
      { key: 'c', text: "passing allowed when it is safe." },
    ],
    correctAnswer: 'c',
    hasDiagram: true,
    diagramType: 'road_lines'
  },
  {
    id: 15,
    text: "From a one-way street, you USUALLY make a left turn from:",
    options: [
      { key: 'a', text: "the left curb lane." },
      { key: 'b', text: "any lane if it is safe to do so." },
      { key: 'c', text: "the two lanes closest to the left curb." },
    ],
    correctAnswer: 'a'
  }
];

// Generate 85 additional questions to reach 100 for the full test mode
// In a production app, these would be real questions from a database.
const ADDITIONAL_QUESTIONS: Question[] = Array.from({ length: 85 }, (_, i) => {
  const id = 16 + i;
  // Cycle through some generic driving safety concepts
  const concepts = [
    { q: "Hydroplaning can occur when driving on wet roads. You should:", a: "slow down and drive on the highest part of the road.", w1: "speed up to get through the water faster.", w2: "slam on your brakes immediately." },
    { q: "If your vehicle begins to skid, you should:", a: "turn the steering wheel in the direction you want to go.", w1: "brake hard and hold the steering wheel straight.", w2: "accelerate to regain traction." },
    { q: "You must yield the right-of-way to an emergency vehicle by:", a: "driving to the right edge of the road and stopping.", w1: "stopping immediately in your lane.", w2: "speeding up to get out of the way." },
    { q: "When approaching a school bus with its red lights flashing, you must:", a: "stop at least 20 feet from the bus.", w1: "slow down and pass with caution.", w2: "honk your horn and continue." },
    { q: "Fatigue affects your ability to:", a: "perceive or react to hazards.", w1: "listen to the radio.", w2: "adjust your mirrors." }
  ];
  
  const concept = concepts[i % concepts.length];
  
  return {
    id: id,
    text: `${concept.q} (Question ${id})`,
    options: [
      { key: 'a', text: concept.a },
      { key: 'b', text: concept.w1 },
      { key: 'c', text: concept.w2 },
    ],
    correctAnswer: 'a'
  };
});

export const QUESTIONS: Question[] = [...BASE_QUESTIONS, ...ADDITIONAL_QUESTIONS];
