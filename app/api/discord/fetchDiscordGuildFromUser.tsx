// import prisma from '@/lib/prisma';
// import { getServerSession } from 'next-auth';
// import { authOptions } from '@/lib/auth';

// export async function updateGuildData(session: any) {
//   try {
//     const session = await getServerSession(authOptions)
//     const session_access_token = session?.user.access_token

//     if (typeof session_access_token !== 'string') {
//       throw new Error('Access token is not a string');
//     }

//     const guildsResponse = await fetch('https://discord.com/api/users/@me/guilds?with_counts=true', {
//       headers: {
//         Authorization: `Bearer ${session_access_token}`,
//       },
//     });

//     if (!guildsResponse.ok) { 
//       throw new Error('Failed to fetch Discord guild data');
//     }

//     const guildsData = await guildsResponse.json();

//     await Promise.all(
//       guildsData.map(async (guild: any) => {
//         // Upsert the DiscordGuild
//         const discordGuild = await prisma.discordGuild.upsert({
//           where: {
//             discordGuildName: guild.name,
//           },
//           update: {
//             approximate_number_count: guild.approximate_member_count,
//             approximate_presence_count: guild.approximate_presence_count,
//             updatedAt: new Date(),
//           },
//           create: {
//             discordGuildId: guild.id,
//             discordGuildName: guild.name,
//             icon: guild.icon,
//             ownerId: guild.owner_id,
//             approximate_number_count: guild.approximate_member_count,
//             approximate_presence_count: guild.approximate_presence_count,
//             description: guild.description,
//             createdAt: new Date(),
//             updatedAt: new Date(),
//           },
//         });

//         // Link the DiscordGuild to the User
//         if (session?.user.global_name) {
//           await prisma.user.update({
//             where: { global_name: session.user.global_name },
//             data: {
//               discordGuild: {
//                 connect: { discordGuildName: discordGuild.discordGuildName },
//               },
//             },
//           });
//         }
//       })
//     );
//     console.log('Guild data updated successfully');
//       return { success: true, message: 'Discord data updated successfully' };
//   } catch (error) {
//     console.error('Error updating Discord data:', error);
//     throw new Error('Error updating Discord data');
//   }
// }