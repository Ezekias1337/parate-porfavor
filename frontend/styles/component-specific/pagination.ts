// Library Imports
import { StyleSheet } from "react-native";

// CSS
import { colors, borderRadius, fontSizes } from "../variables";

export const paginationStyles = StyleSheet.create({
    paginationWrapper: {
        paddingHorizontal: 20,
        maxWidth: "100%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
    },
    pageSelector: {
        borderRadius: borderRadius.borderRadius,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderWidth: 2,
        flexDirection: "row",
        alignItems: "center",
        fontSize: fontSizes.body,
    },
    pageSelectorActive: {
        backgroundColor: colors.primary500,
        borderColor: colors.primary100,
    },
    pageSelectorActiveText: {
        color: colors.primary100,   
    },
    pageSelectorInactiveText: {
        color: colors.neutral900,
    },
    pageSelectorInactive: {
        backgroundColor: colors.primary100,
    }
});
