import GameInfoEditForm from "@/app/ui/components/gamedata/game_info_edit_form";
import React from "react";

export default function page() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-950 mb-2">
        ✏️ Edit game information
      </h1>
      <p className="text-sm text-gray-500 hidden md:block">
        Make changes and submit the form below to update this user
      </p>
      <GameInfoEditForm />
    </div>
  );
}
