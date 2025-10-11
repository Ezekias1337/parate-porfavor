// Library Imports
import { FC, useState, useEffect, Fragment } from "react";
import { View, Text, TouchableOpacity, TextInput } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
// Components
import Card from "../../Card";
import Button, { ButtonProps } from "../../Button";
import Badge, { BadgeProps } from "../../Badge";
// Functions, Helpers, Utils, and Hooks
import addToFavorites from "@/functions/general/addToFavorites";
import removeFromFavorites from "@/functions/general/removeFromFavorites";
import updateNote from "@/functions/general/updateNote";
import deleteNote from "@/functions/general/deleteNote";
// Types and Interfaces
import FontAwesomeIconNames from "../../../types/FontAwesome";
import { Favorite } from "../../../../shared/types/Favorite";
import { Device } from "../../../../shared/types/Device";
import { Note } from "../../../../shared/types/Note";
// CSS
import { colors } from "../../../styles/colors";
import cardStyles from "../../../styles/component-specific/card";
import { inputFieldStyles } from "@/styles/component-specific/input-fields";

interface DeviceCardProps {
  headerText: string;
  bodyText?: string;
  cardIcon: FontAwesomeIconNames;
  buttons?: ButtonProps[];
  badges?: BadgeProps[];
  isFavorite?: boolean;
  favorites: Favorite[];
  setFavorites: React.Dispatch<React.SetStateAction<Favorite[]>>;
  deviceNote?: string;
  setNotes: React.Dispatch<React.SetStateAction<Note[]>>;
  device: Device;
  translate: (key: string) => string;
}

const DeviceCard: FC<DeviceCardProps> = ({
  headerText,
  bodyText,
  cardIcon,
  buttons = [],
  badges = [],
  isFavorite = false,
  favorites,
  setFavorites,
  deviceNote,
  setNotes,
  device,
  translate,
}) => {
  const [displayNoteInput, setDisplayNoteInput] = useState(false);
  const [noteContent, setNoteContent] = useState("");
  
  useEffect(() => {
    if(deviceNote) {
      setNoteContent(deviceNote);
    }
  }, [deviceNote]);

  return (
    <Card>
      <View style={cardStyles.iconContainer}>
        <FontAwesome name={cardIcon} size={32} color={colors.primary500} />
        <View style={cardStyles.touchableIconWrapper}>
          <TouchableOpacity
            onPress={() => {
              setDisplayNoteInput(!displayNoteInput);
            }}
          >
            <FontAwesome
              name={deviceNote ? "sticky-note" : "sticky-note-o"}
              size={32}
              color={colors.primary500}
            />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              if (isFavorite) {
                removeFromFavorites({ device, favorites, setFavorites });
              } else {
                addToFavorites({ device, setFavorites });
              }
            }}
          >
            <FontAwesome
              name={isFavorite ? "heart" : "heart-o"}
              size={32}
              color={colors.primary500}
            />
          </TouchableOpacity>
        </View>
      </View>

      <View style={cardStyles.cardTextWrapper}>
        <Text style={cardStyles.headerText}>{headerText}</Text>
        {bodyText && (
          <Text style={cardStyles.bodyText}>
            {bodyText.split("\n").map((line, index) => (
              <Fragment key={index}>
                {line}
                {"\n"}
              </Fragment>
            ))}
          </Text>
        )}
        {deviceNote && (
          <Text style={cardStyles.bodyText}>
            {translate("note")}: {deviceNote.split("\n").map((line, index) => (
              <Fragment key={index}>
                {line}
                {"\n"}
              </Fragment>
            ))}
          </Text>
        )}
      </View>

      <View style={cardStyles.buttonWrapper}>
        {buttons.map((button, index) => (
          <Button
            key={index}
            text={button.text}
            variant={button.variant}
            leftIcon
            icon={button.icon}
            iconSize={32}
            onClickHandler={button.onClickHandler}
            url={button.url}
            buttonSize="small"
          />
        ))}
      </View>

      <View style={cardStyles.badgeWrapper}>
        {badges.map((badge, index) => (
          <Badge
            key={index}
            text={badge.text}
            variant={badge.variant}
            icon={badge.icon}
            iconSize={16}
            size={badge.size}
            additionalStyle={badge.additionalStyle}
          />
        ))}
      </View>
      {displayNoteInput && (
        <View style={cardStyles.inputSectionWrapper}>
          <TextInput
            placeholder={translate("note")}
            value={noteContent}
            onChangeText={setNoteContent}
            style={inputFieldStyles.textInput}
            placeholderTextColor={colors.primary300}
            id="username"
          />
          <View style={cardStyles.buttonWrapper}>
            <Button
              text={translate("addNote")}
              variant={"success"}
              leftIcon
              icon={"floppy-o"}
              iconSize={32}
              onClickHandler={async () => {
                await updateNote({
                  device,
                  newNoteContent: noteContent,
                  setNotes,
                });
                setDisplayNoteInput(false);
              }}
              buttonSize="small"
            />
            <Button
              text={translate("deleteNote")}
              variant={"error"}
              leftIcon
              icon={"trash"}
              iconSize={32}
              onClickHandler={async () => {
                await deleteNote({
                  device,
                  setNotes,
                });
                setDisplayNoteInput(false);
              }}
              buttonSize="small"
            />
          </View>
        </View>
      )}
    </Card>
  );
};

export default DeviceCard;
