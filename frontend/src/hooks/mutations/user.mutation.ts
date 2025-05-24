import {
  createNewUser,
  editMultipleUsers,
  editUserData,
} from "@/services/users";
import {
  CreateUserDto,
  EditMultipleUsers,
  UpdateUserDto,
} from "@/types/user.types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useCreateNewUser({ onClose }: { onClose: () => void }) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (userData: CreateUserDto) => createNewUser(userData),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["users"] });
      onClose();
    },
  });
}

export function useUpdateSingleUser({ onClose }: { onClose: () => void }) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      userId,
      userData,
    }: {
      userId: number;
      userData: UpdateUserDto;
    }) => editUserData(userId, userData),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["users"] });
      await queryClient.invalidateQueries({ queryKey: ["user"] });
      onClose();
    },
  });
}

export function useUpdateUsers() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (usersModifications: EditMultipleUsers) =>
      editMultipleUsers(usersModifications),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
}
