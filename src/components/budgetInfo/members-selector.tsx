import { useEffect, useRef, useState } from "react";
//* MUI & Icons
import { Autocomplete, Avatar, Box, Button, Chip, TextField, Typography } from "@mui/material";
import { Clear } from "@mui/icons-material";

type User = {
  displayName: string;
  userID: string;
};

interface MembersSelectorProps {
  value: string[];
  onChange: (newMembers: string[]) => void;
}

const users: User[] = [
  { displayName: "Admin", userID: "vFCGt7TupbMn1cH9ICJFK6DNQ4T2" },
  { displayName: "Piotr Bartnicki", userID: "0ui2bsuE7le2DGIyXNHGcOwTqYV2" },
  { displayName: "Ola Skowrońska", userID: "ozFeoFERlzY1B0uIxSN45P1LtJ72" },
];

const MembersSelector = (props: MembersSelectorProps) => {
  const { value, onChange } = props;
  const [selectedUsers, setSelectedUsers] = useState<User[]>([]);
  const autocompleteRef = useRef<any>(null);

  useEffect(() => {
    onChange(selectedUsers.map((item) => item.userID));
  }, [selectedUsers, onChange]);

  const handleChange = (event: React.SyntheticEvent<Element, Event>, newMembers: User[]) => {
    setSelectedUsers(newMembers);
  };

  const handleUserDelete = (userToDelete: User) => {
    setSelectedUsers((prevSelectedUsers) => prevSelectedUsers.filter((user) => user.userID !== userToDelete.userID));
  };

  const handleClear = () => {
    setSelectedUsers([]);
  };

  return (
    <>
      <Typography>Wyślij zaproszenie do:</Typography>
      <Box marginBottom={1}>
        {selectedUsers.length > 0 ? (
          <Button
            aria-label="Dodaj członka"
            size="small"
            variant="text"
            startIcon={<Clear />}
            onClick={handleClear}
            style={{ marginBottom: 5 }}
          >
            <Typography>Wyczyść</Typography>
          </Button>
        ) : null}
        {selectedUsers.map((user) => (
          <Chip
            key={user.userID}
            label={user.displayName}
            onDelete={() => handleUserDelete(user)}
            avatar={<Avatar src="/static/images/avatar/1.jpg" />}
            style={{ marginLeft: 5, marginBottom: 5 }}
          />
        ))}
      </Box>
      <Autocomplete
        multiple
        size="small"
        id="user-search"
        options={users}
        getOptionLabel={(user: User) => user.displayName}
        value={selectedUsers}
        filterSelectedOptions
        onChange={handleChange}
        isOptionEqualToValue={(option: User, value: User) => option.userID === value.userID}
        disableClearable
        openOnFocus
        blurOnSelect
        renderInput={(params) => (
          <TextField {...params} label="Szukaj użytkownika" variant="outlined" inputRef={autocompleteRef} id="user-search-input" />
        )}
        renderOption={(props, user) => (
          <li {...props}>
            <Box display="flex" alignItems="center">
              <Avatar src="/static/images/avatar/1.jpg" />
              <Typography marginLeft={2} variant="body1">
                {user.displayName}
              </Typography>
            </Box>
          </li>
        )}
        renderTags={() => null}
      />
    </>
  );
};

export default MembersSelector;
