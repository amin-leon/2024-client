import React from 'react';

const leaders = [
  {
    id: 1,
    name: 'John Doe',
    role: 'Principal',
    description: 'John has been the principal of our school for over 10 years, leading with a passion for education and community.',
    imageUrl: 'https://media.gettyimages.com/id/57279095/photo/portrait-of-a-policeman-standing-with-his-arms-folded.jpg?s=1024x1024&w=gi&k=20&c=rUckfHeffzU7UkN5NJgw3kp6cgjraKXa8mY3rfnF6fY=' // Placeholder image URL
  },
  {
    id: 2,
    name: 'Jane Smith',
    role: 'Vice Principal',
    description: 'Jane brings a wealth of experience and a dedication to fostering a supportive learning environment.',
    imageUrl: 'https://media.gettyimages.com/id/57279095/photo/portrait-of-a-policeman-standing-with-his-arms-folded.jpg?s=1024x1024&w=gi&k=20&c=rUckfHeffzU7UkN5NJgw3kp6cgjraKXa8mY3rfnF6fY=' // Placeholder image URL
  },
  {
    id: 3,
    name: 'Robert Brown',
    role: 'Head of Mathematics',
    description: 'Robert\'s innovative approach to teaching mathematics has inspired countless students to excel in the subject.',
    imageUrl: 'https://media.gettyimages.com/id/57279095/photo/portrait-of-a-policeman-standing-with-his-arms-folded.jpg?s=1024x1024&w=gi&k=20&c=rUckfHeffzU7UkN5NJgw3kp6cgjraKXa8mY3rfnF6fY=' // Placeholder image URL
  },
  {
    id: 4,
    name: 'Emily White',
    role: 'Head of Science',
    description: 'Emily\'s expertise in the field of science education has led to numerous student achievements and accolades.',
    imageUrl: 'https://media.gettyimages.com/id/57279095/photo/portrait-of-a-policeman-standing-with-his-arms-folded.jpg?s=1024x1024&w=gi&k=20&c=rUckfHeffzU7UkN5NJgw3kp6cgjraKXa8mY3rfnF6fY=' // Placeholder image URL
  },
  {
    id: 5,
    name: 'Michael Green',
    role: 'Head of Arts',
    description: 'Michael\'s commitment to the arts has enriched our school\'s cultural offerings and student creativity.',
    imageUrl: 'https://media.gettyimages.com/id/57279095/photo/portrait-of-a-policeman-standing-with-his-arms-folded.jpg?s=1024x1024&w=gi&k=20&c=rUckfHeffzU7UkN5NJgw3kp6cgjraKXa8mY3rfnF6fY=' // Placeholder image URL
  },
  {
    id: 6,
    name: 'Linda Johnson',
    role: 'Head of Sports',
    description: 'Linda\'s leadership in the sports department has led our teams to numerous victories and fostered teamwork.',
    imageUrl: 'https://media.gettyimages.com/id/57279095/photo/portrait-of-a-policeman-standing-with-his-arms-folded.jpg?s=1024x1024&w=gi&k=20&c=rUckfHeffzU7UkN5NJgw3kp6cgjraKXa8mY3rfnF6fY=' // Placeholder image URL
  }
];

const Home = () => {
  return (
    <div className="container mx-auto py-2">
      <h1 className="text-2xl font-bold text-center mb-10">School Leaders Hierachy</h1>
      <div className="flex flex-col gap-8">
        <div className="flex justify-center w-full gap-16 md:gap-32">
          {leaders.slice(0, 1).map(leader => (
            <div key={leader.id} className="flex flex-col items-center">
              <img className="md:w-48 md:h-48 object-cover rounded-md" src={leader.imageUrl} alt={leader.name} />
              <p className="mt-2 text-center">{leader.role}</p>
              <p className="mt-2 text-center">{leader.role}</p>
            </div>
          ))}
        </div>
        <div className="flex justify-center w-full gap-16 md:gap-32">
          {leaders.slice(1, 3).map(leader => (
            <div key={leader.id} className="flex flex-col items-center">
              <img className="md:w-48 md:h-48 object-cover rounded-md" src={leader.imageUrl} alt={leader.name} />
              <p className="mt-2 text-center">{leader.role}</p>
              <p className="mt-2 text-center">{leader.role}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
