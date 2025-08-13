import { useId } from "react";
import { useFetcher, useNavigation } from "react-router";
import Button from "../../components/Button";
import Spinner from "../../components/Spinner";
import type { APIerror } from "../../types/api-types";

export default function Index() {
    const id = useId();

    const navigation = useNavigation();

    const fetcher = useFetcher();

    const error = fetcher.data as APIerror | undefined;

    const nameErrorMessage = error?.data?.find(
        ({ path }) => path === "name",
    )?.msg;

    return (
        <div className="flex h-full items-center justify-center">
            <div className="rounded-md bg-gray-50 p-12 shadow dark:bg-gray-950">
                <fetcher.Form
                    action="new-player"
                    className="flex flex-col gap-6"
                >
                    <div className="flex flex-col gap-2">
                        <label className="text-lg font-medium" htmlFor={id}>
                            Name *
                        </label>
                        <input
                            className="rounded-md border border-gray-200 bg-gray-100 p-2 dark:border-gray-800 dark:bg-gray-900"
                            id={id}
                            name="name"
                            autoFocus
                            autoComplete="name"
                            type="text"
                            maxLength={16}
                            required
                        />
                        {nameErrorMessage ? (
                            <p className="text-red-600">{nameErrorMessage}</p>
                        ) : null}
                    </div>
                    <Button
                        type="submit"
                        disabled={navigation.state !== "idle"}
                    >
                        {navigation.state === "idle" ? (
                            "Continue"
                        ) : (
                            <div className="flex justify-center">
                                <Spinner size={20} />
                            </div>
                        )}
                    </Button>
                </fetcher.Form>
            </div>
        </div>
    );
}
