export class Sauce {
 
//  _id: { type: String, required: true },
_id: string; 
userId: string; 
name: string;
manufacturer: string;
description: string;
heat: number;
likes: number;
dislikes: number;
imageUrl: string;
mainPepper: string;
usersLiked: [];
usersDisliked: [];
}
