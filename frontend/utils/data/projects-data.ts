import { StaticImageData } from 'next/image';
import casino from '/public/image/VVSL.png';
import ironwill from '/public/image/ironwill.png';
import RubyExchange from '/public/image/ruby-exchange.png';
import NYWNFT from '/public/image/nyw-nft.png';

interface Project {
    id: number;
    name: string;
    description: string;
    tools: string[];
    role: string;
    code: string;
    demo: string;
    image: StaticImageData;
}

export const projectsData: Project[] = [
    {
        id: 1,
        name: 'IRONWILL',
        description: "ERC20 FICCO token presale on Ethereum blockchain.",
        tools: ['Nextjs', 'Typescript', 'TailwindCSS', 'Ethersjs', 'Wagmi', 'Rainbow Kit', 'Solidity', 'Hardhat'],
        role: 'Technical Co-founder',
        code: '',
        demo: 'https://www.ironwill.io/',
        image: ironwill
    },
    {
        id: 2,
        name: 'NYW NFT Marketplace',
        description: 'NFT marketplace on Ethereum blockchain.',
        tools: ['NextJS', 'Tailwind CSS', "TypeScript", "Nodejs", "ExpressJS", "SubGraph", "GraphQL", "Ethers.js", "Wagmi", "Solidity", "Hardhat"],
        role: 'Senior Blockchain Developer',
        code: '',
        demo: 'https://www.minato-yellowflash.com/',
        image: NYWNFT,
    },
    {
        id: 3,
        name: 'RubyExchange',
        description: 'DEX platform for crypto trading on Ethereum blockchain.',
        tools: ['Nextjs', 'TypeScript', 'TailwindCSS', 'Web3.js', 'Solidity', 'Hardhat', 'Openzeppelin', 'IPFS'],
        code: '',
        role: 'Lead Smart Contract Developer',
        demo: 'https://ruby.exchange/',
        image: RubyExchange,
    },
    {
        id: 4,
        name: 'Bollygaming casino games',
        description: "A B2B casino gaming platform emphasizing free-to-play mechanics for new users.",
        tools: ['NextJS', 'Material UI', 'Redux', 'Typescript', "Pixijs", "Laravel", "MongoDB", "Socket.io"],
        code: '',
        demo: 'https://lobbyuat.bollygaming.games/slot/mbsl/?token=c42ca54b-0e44-4348-95c5-f0c058334847',
        image: casino,
        role: 'Full Stack Developer',
    }
];

// Do not remove any property.
// Leave it blank instead as shown below

// {
//     id: 1,
//     name: '',
//     description: "",
//     tools: [],
//     role: '',
//     code: '',
//     demo: '',
//     image: crefin,
// },