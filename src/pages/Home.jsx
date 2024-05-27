import React from 'react';

const leaders = [
  {
    id: 1,
    name: 'CP R Mujiji',
    role: 'Commandant',
    description: 'John has been the principal of our school for over 10 years, leading with a passion for education and community.',
    imageUrl: 'https://police.gov.rw/fileadmin/user_upload/mujiji.jpg'
  },
  {
    id: 2,
    name: 'ACP O NTAGANIRA ',
    role: 'Dpt Commandant',
    description: 'Jane brings a wealth of experience and a dedication to fostering a supportive learning environment.',
    imageUrl: 'https://police.gov.rw/fileadmin/user_upload/RUKU2.png'
  },
  {
    id: 3,
    name: 'Rtd ACP P GAKWAYA',
    role: 'Academics',
    description: 'Robert\'s innovative approach to teaching mathematics has inspired countless students to excel in the subject.',
    imageUrl: 'https://police.gov.rw/fileadmin/user_upload/gumira.jpg'
  },
];

const Home = () => {
  return (
    <div className="container mx-auto py-2 rounded-md bg-gray-200">
      <h1 className="text-2xl font-bold text-center mb-10">NPC Leadership Stracture</h1>
      <div className="flex flex-col gap-8">
        <div className="flex justify-center w-full gap-16 md:gap-32">
          {leaders.slice(0, 1).map(leader => (
            <div key={leader.id} className="flex flex-col items-center">
              <img className="md:w-56 md:h-56 object-cover rounded-md" src={leader.imageUrl} alt={leader.name} />
              <p className="mt-2 text-center"><span className='font-bold'>{leader.role}:</span> {leader.name}</p>
            </div>
          ))}
        </div>
        <div className="flex justify-center w-full gap-16 md:gap-72">
          {leaders.slice(1, 3).map(leader => (
            <div key={leader.id} className="flex flex-col items-center">
              <img className="md:w-56 md:h-56 object-cover rounded-md" src={leader.imageUrl} alt={leader.name} />
              <p className="mt-2 text-center"><span span className='font-bold'>{leader.role}:</span> {leader.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
